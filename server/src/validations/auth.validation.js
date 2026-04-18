import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .pattern(/^[a-zA-Z0-9_]+$/)
        .messages({
            "string.empty": "Username is required",
            "string.min": "Username must be at least 3 characters",
            "string.max": "Username must be at most 30 characters",
            "string.pattern.base": "Username can only contain letters, numbers and underscores"
        }),
    email: Joi.string()
        .email()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address"
        }),
    password: Joi.string()
        .min(6)
        .max(50)
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password must be at most 50 characters"
        }),
    role: Joi.string()
        .valid("user", "admin")
        .default("user")
        .messages({
            "any.only": "Role must be either user or admin"
        })
}).messages({
    "object.unknown": "Unknown field provided"
});

export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required"
        }),
    password: Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required",
            "any.required": "Password is required"
        })
});

export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string()
        .required()
        .messages({
            "string.empty": "Refresh token is required",
            "any.required": "Refresh token is required"
        })
});