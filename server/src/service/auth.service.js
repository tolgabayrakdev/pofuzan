import authRepository from "../repository/auth.repository.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../util/jwt.js";
import HttpException from "../exceptions/http-exception.js";

class AuthService {
    async register(userData) {
        const { username, email, password, role } = userData;

        if (!username || !email || !password) {
            throw new HttpException(400, "Username, email and password are required");
        }

        if (password.length < 6) {
            throw new HttpException(400, "Password must be at least 6 characters");
        }

        const existingUser = await authRepository.findByEmail(email);
        if (existingUser) {
            throw new HttpException(409, "Sorry, this email is already registered");
        }

        const user = await authRepository.create({ username, email, password, role });

        return this._generateTokens(user);
    }

    async login(email, password) {
        if (!email || !password) {
            throw new HttpException(400, "Email and password are required");
        }

        const user = await authRepository.findByEmail(email);
        if (!user) {
            throw new HttpException(401, "Sorry, user not found with this email");
        }

        const isValidPassword = await authRepository.comparePassword(password, user.password);
        if (!isValidPassword) {
            throw new HttpException(401, "Sorry, incorrect password");
        }

        return this._generateTokens(user);
    }

    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new HttpException(401, "Refresh token is required");
        }

        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded) {
            throw new HttpException(401, "Sorry, invalid or expired refresh token");
        }

        const user = await authRepository.findById(decoded.id);
        if (!user) {
            throw new HttpException(404, "Sorry, user not found");
        }

        return this._generateTokens(user);
    }

    async getProfile(userId) {
        const user = await authRepository.findById(userId);
        if (!user) {
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
