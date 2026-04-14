import { verifyAccessToken } from "../util/jwt.js";
import HttpException from "../exceptions/http-exception.js";

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new HttpException(401, "Sorry, no access token provided"));
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    if (!decoded) {
        return next(new HttpException(401, "Sorry, invalid or expired access token"));
    }

    req.user = decoded;
    next();
}
