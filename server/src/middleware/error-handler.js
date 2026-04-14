import HttpException from "../exceptions/http-exception.js";

export default function errorHandler(err, _req, res, _next) {
    if (err instanceof HttpException) {
        return res.status(err.statusCode).json({
            status: "error",
            statusCode: err.statusCode,
            message: err.message
        });
    }

    if (process.env.NODE_ENV !== "production") {
        console.error("Unhandled Error:", err);
    }

    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === "production"
        ? "Sorry, something went wrong on our end"
        : err.message;

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
}
