import jwt from "jsonwebtoken";

const blacklist = new Set();

export function addToBlacklist(token) {
    try {
        const decoded = jwt.decode(token);
        if (decoded && decoded.exp) {
            const ttl = decoded.exp * 1000 - Date.now();
            if (ttl > 0) {
                blacklist.add(token);
                setTimeout(() => blacklist.delete(token), ttl);
            }
        }
    } catch (error) {
        console.error("Blacklist error:", error.message);
    }
}

export function isBlacklisted(token) {
    return blacklist.has(token);
}

export function clearBlacklist() {
    blacklist.clear();
}