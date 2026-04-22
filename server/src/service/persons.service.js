import personsRepository from '../repository/persons.repository.js';
import HttpException from '../exceptions/http-exception.js';
import logger from '../util/logger.js';

class PersonsService {
  async getAll(userLevel) {
    const persons = await personsRepository.findAll(userLevel);
    logger.info({ count: persons.length, userLevel }, 'Persons fetched');
    return persons;
  }

  async getById(id, userLevel) {
    const person = await personsRepository.findById(id, userLevel);
    if (!person) {
      throw new HttpException(404, 'Person not found or access denied');
    }
    return person;
  }

  async create(personData, userId, userLevel) {
    if (userLevel < 2) {
      throw new HttpException(403, 'Only level 2+ can create persons');
    }

    const person = await personsRepository.create({
      first_name: personData.first_name,
      last_name: personData.last_name,
      view_level: 1,
      created_by: userId,
    });
    logger.info({ personId: person.id, userId }, 'Person created');
    return person;
  }

  async update(id, personData, userLevel) {
    const existing = await personsRepository.findById(id, 3);
    if (!existing) {
      throw new HttpException(404, 'Person not found or access denied');
    }

    const person = await personsRepository.update(id, personData);
    if (!person) {
      throw new HttpException(400, 'No fields to update');
    }

    logger.info({ personId: id, userLevel }, 'Person updated');
    return person;
  }

  async updateAccess(id, viewLevel, grantorLevel) {
    if (grantorLevel < 3) {
      throw new HttpException(403, 'Only level 3 can grant access');
    }

    if (![1, 2, 3].includes(viewLevel)) {
      throw new HttpException(400, 'View level must be 1, 2, or 3');
    }

    const existing = await personsRepository.findById(id, 3);
    if (!existing) {
      throw new HttpException(404, 'Person not found');
    }

    const person = await personsRepository.updateViewLevel(id, viewLevel);
    logger.info(
      { personId: id, viewLevel, grantorLevel },
      'Person access updated'
    );
    return person;
  }

  async delete(id, userLevel) {
    if (userLevel < 3) {
      throw new HttpException(403, 'Only level 3 can delete');
    }

    const existing = await personsRepository.findById(id, 3);
    if (!existing) {
      throw new HttpException(404, 'Person not found or access denied');
    }

    const result = await personsRepository.delete(id);
    logger.info({ personId: id, userLevel }, 'Person deleted');
    return result;
  }
}

export default new PersonsService();
