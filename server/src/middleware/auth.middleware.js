import { verifyAccessToken } from '../util/jwt.js';
import { isBlacklisted } from '../util/token-blacklist.js';
import HttpException from '../exceptions/http-exception.js';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new HttpException(401, 'Sorry, no access token provided'));
  }

  const token = authHeader.split(' ')[1];

  if (isBlacklisted(token)) {
    return next(new HttpException(401, 'Token has been revoked'));
  }

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return next(
      new HttpException(401, 'Sorry, invalid or expired access token')
    );
  }

  req.user = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
    access_lvl: decoded.access_lvl || 1,
    session_id: decoded.session_id || null,
  };
  next();
}
