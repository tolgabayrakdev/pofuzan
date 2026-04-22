import pool from '../config/database.js';
import { withTransaction } from '../util/database.js';

class PersonsRepository {
  async findAll(userLevel) {
    const result = await pool.query(
      'SELECT * FROM persons WHERE view_level <= $1 ORDER BY created_at DESC',
      [userLevel]
    );
    return result.rows;
  }

  async findById(id, userLevel) {
    const result = await pool.query(
      'SELECT * FROM persons WHERE id = $1 AND view_level <= $2',
      [id, userLevel]
    );
    return result.rows[0];
  }

  async create(personData) {
    const { first_name, last_name, view_level, created_by } = personData;

    return await withTransaction(async (client) => {
      const result = await client.query(
        `INSERT INTO persons (first_name, last_name, view_level, created_by)
                 VALUES ($1, $2, $3, $4) RETURNING *`,
        [first_name, last_name, view_level || 1, created_by]
      );
      return result.rows[0];
    });
  }

  async update(id, personData) {
    const { first_name, last_name } = personData;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (first_name) {
      updates.push(`first_name = $${paramCount++}`);
      values.push(first_name);
    }
    if (last_name) {
      updates.push(`last_name = $${paramCount++}`);
      values.push(last_name);
    }

    if (updates.length === 0) return null;

    values.push(id);

    const result = await pool.query(
      `UPDATE persons SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
             WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0];
  }

  async updateViewLevel(id, viewLevel) {
    const result = await pool.query(
      'UPDATE persons SET view_level = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [viewLevel, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      'DELETE FROM persons WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
}

export default new PersonsRepository();
