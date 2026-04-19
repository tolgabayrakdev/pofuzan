import authRepository from "../repository/auth.repository.js";
import sessionRepository from "../repository/session.repository.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../util/jwt.js";
import HttpException from "../exceptions/http-exception.js";
import logger from "../util/logger.js";

class AuthService {
    async register(userData) {
        const { username, email, password, role, access_lvl } = userData;

        const existingUser = await authRepository.findByEmail(email);
        if (existingUser) {
            logger.warn({ email }, "Registration failed - email already exists");
            throw new HttpException(409, "Sorry, this email is already registered");
        }

        const user = await authRepository.create({ username, email, password, role, access_lvl });
        logger.info({ userId: user.id, email }, "User registered successfully");

        return this._generateTokens(user);
    }

    async login(email, password, sessionData) {
        const user = await authRepository.findByEmail(email);
        if (!user) {
            logger.warn({ email }, "Login failed - user not found");
            throw new HttpException(401, "Sorry, user not found with this email");
        }

        const isValidPassword = await authRepository.comparePassword(password, user.password);
        if (!isValidPassword) {
            logger.warn({ email }, "Login failed - invalid password");
            throw new HttpException(401, "Sorry, incorrect password");
        }

        const session = await sessionRepository.create({
            user_id: user.id,
            ip_address: sessionData.ip_address,
            user_agent: sessionData.user_agent,
            device_info: sessionData.device_info
        });

        logger.info({ userId: user.id, sessionId: session.id, ip: sessionData.ip_address }, "User logged in successfully");
        return this._generateTokens(user, session.id);
    }

    async logout(sessionId) {
        if (!sessionId) {
            throw new HttpException(400, "Session ID required");
        }

        const session = await sessionRepository.end(sessionId);
        logger.info({ sessionId }, "User logged out successfully");
        return { message: "Logged out successfully", session };
    }

    async refreshToken(refreshToken) {
        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded) {
            logger.warn("Refresh token failed - invalid or expired token");
            throw new HttpException(401, "Sorry, invalid or expired refresh token");
        }

        const user = await authRepository.findById(decoded.id);
        if (!user) {
            logger.warn({ userId: decoded.id }, "Refresh token failed - user not found");
            throw new HttpException(404, "Sorry, user not found");
        }

        logger.info({ userId: user.id }, "Token refreshed successfully");
        return this._generateTokens(user, decoded.session_id);
    }

    async getProfile(userId) {
        const user = await authRepository.findById(userId);
        if (!user) {
            logger.warn({ userId }, "Get profile failed - user not found");
            throw new HttpException(404, "Sorry, user not found");
        }
        return user;
    }

    async getActiveSessions(userLevel) {
        if (userLevel < 3) {
            throw new HttpException(403, "Only level 3 can view all sessions");
        }
        return await sessionRepository.getActiveSessions();
    }

    async getSessionStats(userLevel) {
        if (userLevel < 3) {
            throw new HttpException(403, "Only level 3 can view session stats");
        }
        return await sessionRepository.getSessionStats();
    }

    async getUserSessions(userId, limit = 50) {
        return await sessionRepository.getUserSessions(userId, limit);
    }

    _generateTokens(user, sessionId = null) {
        const payload = { 
            id: user.id, 
            email: user.email, 
            role: user.role, 
            access_lvl: user.access_lvl,
            session_id: sessionId 
        };

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                access_lvl: user.access_lvl
            },
            accessToken: generateAccessToken(payload),
            refreshToken: generateRefreshToken(payload)
        };
    }
}

export default new AuthService();
