import HttpException from "../exceptions/http-exception.js";

export function requireLevel(requiredLevel) {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return next(new HttpException(401, "Authentication required"));
        }

        if (user.access_lvl < requiredLevel) {
            return next(new HttpException(403, `Access level ${requiredLevel} or higher required`));
        }

        next();
    };
}

export function requireExactLevel(requiredLevel) {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return next(new HttpException(401, "Authentication required"));
        }

        if (user.access_lvl !== requiredLevel) {
            return next(new HttpException(403, `Exact access level ${requiredLevel} required`));
        }

        next();
    };
}

export function canGrantAccess(grantorLevel, targetLevel) {
    return grantorLevel >= targetLevel;
}

export function canView(viewLevel, userLevel) {
    return userLevel >= viewLevel;
}