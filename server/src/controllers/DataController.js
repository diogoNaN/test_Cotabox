import knex from '../database/connection';

class DataController {
  async index(req, res) {
    const users = await knex.select().from('users');

    let previousParticipation = 0;

    users.map((item) => previousParticipation += item.participation);

    if (previousParticipation < 100) {
      users.push({
        id: null,
        firstName: 'Available',
        lastName: 'Space',
        participation: 100 - previousParticipation,
      });
    }
    return res.json({ users });
  }

  async create(req, res) {
    const { firstName, lastName, participation } = req.body;

    const users = await knex.select().from('users');

    let previousParticipation = 0;

    if (users.length > 0) {
      users.map((item) => previousParticipation += item.participation);
    }

    if (previousParticipation >= 100 || previousParticipation + participation > 100) {
      return res.status(400).json({ message: `Participação máxima permitida: ${100 - previousParticipation}%` });
    }

    const id = await knex('users').insert({ firstName, lastName, participation });

    users.push({
      id: id[0],
      firstName,
      lastName,
      participation,
    });

    if (previousParticipation + participation < 100) {
      users.push({
        id: null,
        firstName: 'Available',
        lastName: 'Space',
        participation: 100 - (previousParticipation + participation),
      });
    }

    return res.json({
      message: 'Dado registrado com sucesso!',
      users,
    });
  }
}

export default new DataController();
