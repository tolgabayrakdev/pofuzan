import authRepository from "../repository/auth.repository.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../util/jwt.js";
import HttpException from "../exceptions/http-exception.js";
import logger from "../util/logger.js";

class AuthService {
    async register(userData) {
        const { username, email, password, role } = userData;

        const existingUser = await authRepository.findByEmail(email);
        if (existingUser) {
            logger.warn({ email }, "Registration failed - email already exists");
            throw new HttpException(409, "Sorry, this email is already registered");
        }

        const user = await authRepository.create({ username, email, password, role });
        logger.info({ userId: user.id, email }, "User registered successfully");

        return this._generateTokens(user);
    }

    async login(email, password) {
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

        logger.info({ userId: user.id }, "User logged in successfully");
        return this._generateTokens(user);
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
        return this._generateTokens(user);
    }

    async getProfile(userId) {
        const user = await authRepository.findById(userId);
        if (!user) {
            logger.warn({ userId }, "Get profile failed - user not found");
            throw new HttpException(404, "Sorry, user not found");
        }
        return user;
    }

    _generateTokens(user) {
        const payload = { id: user.id, email: user.email, role: user.role };

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            accessToken: generateAccessToken(payload),
            refreshToken: generateRefreshToken(payload)
        };
    }
}

export default new AuthService();
