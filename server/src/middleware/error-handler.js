import HttpException from "../exceptions/http-exception.js";

export default function errorHandler(err, req, res, _next) {
    if (err instanceof HttpException) {
        return res.status(err.status).json({ message: err.message });
    }

    res.status(500).json({ message: "Internal server error" });
}