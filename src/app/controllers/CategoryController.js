const CategoryRepository = require('../repositories/CategoriesRepository');

class CategoryController {

  async store(req, res) {

    const { name } = req.body;

    if (!name) {

      return res.status(400).json({ error: 'A name is required' });
    }

    const category = await CategoryRepository.create({ name });

    res.json(category);
  }

  async index(req, res) {

    const { orderBy } = req.params;

    const rows = await CategoryRepository.findAll(orderBy);

    res.json(rows);
  }

  async update(req, res) {

    const { id } = req.params;
    const { name } = req.body;

    if (!name) {

      return res.status(400).json({ error: 'A name is required' });
    }

    const category = await CategoryRepository.update(id, { name });

    res.json(category);
  }

  async delete(req, res) {

    const { id } = req.params;

    await CategoryRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
