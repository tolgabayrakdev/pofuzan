import pool from '../config/database.js';
import { withTransaction } from '../util/database.js';
import { generateHash, checkPassword } from '../util/password.js';

class AuthRepository {
  async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE LOWER(email) = LOWER($1)',
      [email]
    );
    return result.rows[0];
  }

  async findById(id) {
    const result = await pool.query(
      'SELECT id, email, role, access_lvl, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  async create(userData) {
    const { email, password, role, access_lvl } = userData;
    const hashedPassword = await generateHash(password);

    return await withTransaction(async (client) => {
      const result = await client.query(
        'INSERT INTO users (email, password, role, access_lvl) VALUES ($1, $2, $3, $4) RETURNING id, email, role, access_lvl, created_at',
        [email, hashedPassword, role || 'user', access_lvl || 1]
      );
      return result.rows[0];
    });
  }

  async findRegistrationCode(code) {
    const result = await pool.query(
      `SELECT * FROM registration_codes 
             WHERE code = $1 AND is_active = true 
             AND (expires_at IS NULL OR expires_at > NOW()) 
             AND used_count < max_uses`,
      [code]
    );
    return result.rows[0];
  }

  async incrementCodeUsage(codeId) {
    await pool.query(
      'UPDATE registration_codes SET used_count = used_count + 1 WHERE id = $1',
      [codeId]
    );
  }

  async comparePassword(password, hashedPassword) {
    return await checkPassword(password, hashedPassword);
  }
}

export default new AuthRepository();
