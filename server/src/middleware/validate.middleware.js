import Joi from "joi";
import HttpException from "../exceptions/http-exception.js";

export function validate(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => ({
                field: detail.path.join("."),
                message: detail.message
            }));
            return next(new HttpException(400, "Validation failed", errors));
        }

        req.body = value;
        next();
    };
}