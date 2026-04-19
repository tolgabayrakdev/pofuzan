import personsService from "../service/persons.service.js";

class PersonsController {
    async getAll(req, res, next) {
        try {
            const persons = await personsService.getAll(req.user.access_lvl);
            res.json(persons);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const person = await personsService.getById(req.params.id, req.user.access_lvl);
            res.json(person);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const { first_name, last_name } = req.body;
            const person = await personsService.create({ first_name, last_name }, req.user.id, req.user.access_lvl);
            res.status(201).json(person);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { first_name, last_name } = req.body;
            const person = await personsService.update(req.params.id, { first_name, last_name }, req.user.access_lvl);
            res.json(person);
        } catch (error) {
            next(error);
        }
    }

    async updateAccess(req, res, next) {
        try {
            const { view_level } = req.body;
            const person = await personsService.updateAccess(req.params.id, view_level, req.user.access_lvl);
            res.json(person);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await personsService.delete(req.params.id, req.user.access_lvl);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new PersonsController();