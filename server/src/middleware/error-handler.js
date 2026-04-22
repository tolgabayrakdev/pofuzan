import HttpException from '../exceptions/http-exception.js';
import logger from '../util/logger.js';

export default function errorHandler(err, req, res, _next) {
  if (err instanceof HttpException) {
    logger.warn({ err, req: req.raw }, 'Validation error');
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || null,
    });
  }

  logger.error({ err, req: req.raw }, 'Unhandled error');

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Sorry, something went wrong on our end'
      : err.message;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
}
