const ContactRepository = require('../repositories/ContactsRepository');

class ContactController {

  async store(req, res) {

    const {
      name, phone, email, categoryId,
    } = req.body;

    if (!name) {

      return res.status(400).json({ error: 'A name is required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {

      return res.status(400).json({ error: 'This email is already in use' });
    }

    const contact = await ContactRepository.create({
      name, phone, email, categoryId,
    });

    res.json(contact);
  }

  async index(req, res) {

    const { orderBy } = req.query;

    const contacts = await ContactRepository.findAll(orderBy);

    res.json(contacts);
  }

  async show(req, res) {

    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {

      return res
        .status(404)
        .json({ error: 'Contact Not Found' });
    }

    res.json(contact);
  }

  async update(req, res) {

    const { id } = req.params;
    const {
      name, phone, email, categoryId,
    } = req.body;

    if (!name) {

      return res.status(400).json({ error: 'A name is required' });
    }

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {

      return res.status(404).json({ error: 'Contact Not Found' });
    }

    const emailInUse = await ContactRepository.findByEmail(email);

    if (emailInUse && emailInUse.id !== id) {

      return res.status(400).json({ error: 'This email is already in use' });
    }

    const contact = await ContactRepository.update(id, {
      name, phone, email, categoryId,
    });

    res.json(contact);
  }

  async delete(req, res) {

    const { id } = req.params;

    await ContactRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
