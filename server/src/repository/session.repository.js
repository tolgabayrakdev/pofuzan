import pool from '../config/database.js';
import { withTransaction } from '../util/database.js';

class SessionRepository {
  async create(sessionData) {
    const { user_id, ip_address, user_agent, device_info } = sessionData;

    return await withTransaction(async (client) => {
      const result = await client.query(
        `INSERT INTO sessions (user_id, ip_address, user_agent, device_info)
                 VALUES ($1, $2, $3, $4) RETURNING *`,
        [user_id, ip_address, user_agent, device_info]
      );
      return result.rows[0];
    });
  }

  async end(id) {
    const result = await pool.query(
      `UPDATE sessions 
             SET ended_at = CURRENT_TIMESTAMP, 
                 duration_minutes = EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - started_at))/60,
                 is_active = FALSE
             WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }

  async getActiveByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM sessions WHERE user_id = $1 AND is_active = TRUE ORDER BY started_at DESC',
      [userId]
    );
    return result.rows;
  }

  async getActiveSessions() {
    const result = await pool.query(
      `SELECT s.*, u.username, u.email 
             FROM sessions s 
             JOIN users u ON s.user_id = u.id 
             WHERE s.is_active = TRUE 
             ORDER BY s.started_at DESC`
    );
    return result.rows;
  }

  async getTodaySessions() {
    const result = await pool.query(
      `SELECT s.*, u.username, u.email 
             FROM sessions s 
             JOIN users u ON s.user_id = u.id 
             WHERE DATE(s.started_at) = CURRENT_DATE 
             ORDER BY s.started_at DESC`
    );
    return result.rows;
  }

  async getSessionStats(userId = null) {
    let query = `
            SELECT 
                COUNT(*) as total_sessions,
                COUNT(CASE WHEN is_active = TRUE THEN 1 END) as active_sessions,
                COUNT(CASE WHEN DATE(started_at) = CURRENT_DATE THEN 1 END) as today_sessions,
                AVG(duration_minutes) as avg_duration_minutes
            FROM sessions
        `;

    if (userId) {
      query += ` WHERE user_id = $1`;
      const result = await pool.query(query, [userId]);
      return result.rows[0];
    }

    const result = await pool.query(query);
    return result.rows[0];
  }

  async getUserSessions(userId, limit = 50) {
    const result = await pool.query(
      `SELECT * FROM sessions WHERE user_id = $1 ORDER BY started_at DESC LIMIT $2`,
      [userId, limit]
    );
    return result.rows;
  }
}

export default new SessionRepository();
