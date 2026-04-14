import authService from "../service/auth.service.js";

class AuthController {
    async register(req, res, next) {
        try {
            const { username, email, password, role } = req.body;
            const result = await authService.register({ username, email, password, role });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await authService.refreshToken(refreshToken);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req, res, next) {
        try {
            const user = await authService.getProfile(req.user.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
