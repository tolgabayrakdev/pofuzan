import pool from "../config/database.js";
import { withTransaction } from "../util/database.js";
import { generateHash, checkPassword } from "../util/password.js";

class AuthRepository {
    async findByEmail(email) {
        const result = await pool.query(
            "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
            [email]
        );
        return result.rows[0];
    }

    async findById(id) {
        const result = await pool.query(
            "SELECT id, username, email, role, access_lvl, created_at FROM users WHERE id = $1",
            [id]
        );
        return result.rows[0];
    }

    async create(userData) {
        const { username, email, password, role } = userData;
        const hashedPassword = await generateHash(password);

        return await withTransaction(async (client) => {
            const result = await client.query(
                "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at",
                [username, email, hashedPassword, role || "user"]
            );
            return result.rows[0];
        });
    }

    async comparePassword(password, hashedPassword) {
        return await checkPassword(password, hashedPassword);
    }
}

export default new AuthRepository();
