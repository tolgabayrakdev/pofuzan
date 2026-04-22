import jwt from 'jsonwebtoken';

function handleError(error) {
  const errorMessage = error.message || 'Unknown JWT error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`JWT Error: ${errorMessage}`);
  }

  return null;
}

export function generateAccessToken(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    });
  } catch (error) {
    console.error('Failed to generate access token:', error.message);
    throw error;
  }
}

export function generateRefreshToken(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });
  } catch (error) {
    console.error('Failed to generate refresh token:', error.message);
    throw error;
  }
}

export function decodeToken(token) {
  try {
    return jwt.decode(token);
  } catch (error) {
    return handleError(error);
  }
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return handleError(error);
  }
}

export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return handleError(error);
  }
}
