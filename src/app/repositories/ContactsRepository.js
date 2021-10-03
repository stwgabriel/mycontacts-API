const db = require('../../database');

class ContactRepository {

  async create({
    name, phone, email, categoryId,
  }) {

    // eslint-disable-next-line no-unused-vars
    const [row] = await db.query(`
      INSERT INTO contacts(name, phone, email, categoryID)
      VALUES($1,$2,$3,$4)
      RETURNING *
    `, [name, phone, email, categoryId]);

    return row;
  }

  async findAll(orderBy = 'ASC') {

    const dir = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT contacts.*, categories.name AS categoryName
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.categoryId
      ORDER BY contacts.name ${dir}
    `);
    return rows;
  }

  async findById(id) {

    const [row] = await db.query(`
      SELECT contacts.*, categories.name AS categoryName
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.categoryId
      WHERE contacts.id = $1`, [id]);
    return row;
  }

  async findByEmail(email) {

    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async update(id, {
    name, phone, email, categoryId,
  }) {

    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, phone = $2, email = $3, categoryId = $4
      WHERE id = $5
      RETURNING *
    `, [name, phone, email, categoryId, id]);

    return row;
  }

  async delete(id) {

    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ContactRepository();
