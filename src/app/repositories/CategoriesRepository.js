const db = require('../../database');

class CategoryRepository {

  async create({ name }) {

    const [row] = await db.query(`
      INSERT INTO categories(name)
      values($1)
      RETURNING *
    `, [name.toLowerCase()]);

    return row;
  }

  async findAll(orderBy = 'ASC') {

    const dir = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`SELECT * FROM categories ORDER BY name ${dir}`);
    return rows;
  }

  async findById(id) {

    const [row] = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return row;
  }

  async update(id, { name }) {

    const [row] = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);

    return row;
  }

  async delete(id) {

    const deleteOp = await db.query('DELETE FROM categories WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new CategoryRepository();
