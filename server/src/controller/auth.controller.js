import authService from '../service/auth.service.js';

function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function getDeviceInfo(req) {
  const userAgent = req.headers['user-agent'] || 'unknown';
  return `${userAgent.substring(0, 250)}`;
}

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, registration_code } = req.body;
      const result = await authService.register({
        email,
        password,
        registration_code,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const sessionData = {
        ip_address: getClientIp(req),
        user_agent: req.headers['user-agent'],
        device_info: getDeviceInfo(req),
      };
      const result = await authService.login(email, password, sessionData);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const sessionId = req.user.session_id;
      const accessToken = req.headers.authorization?.split(' ')[1];
      const result = await authService.logout(sessionId, accessToken);
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

  async getActiveSessions(req, res, next) {
    try {
      const sessions = await authService.getActiveSessions(req.user.access_lvl);
      res.json(sessions);
    } catch (error) {
      next(error);
    }
  }

  async getSessionStats(req, res, next) {
    try {
      const stats = await authService.getSessionStats(req.user.access_lvl);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }

  async getMySessions(req, res, next) {
    try {
      const sessions = await authService.getUserSessions(req.user.id);
      res.json(sessions);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
