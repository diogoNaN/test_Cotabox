import express from 'express';
import { celebrate, Joi } from 'celebrate';

import DataController from './controllers/DataController';

const routes = express.Router();

routes.get('/', DataController.index);
routes.post('/', celebrate({

  body: Joi.object().keys({
    firstName: Joi.string().required().max(16).error(new Error("First Name not receivied...")),
    lastName: Joi.string().required().max(16).error(new Error("Last Name not receivied...")),
    participation: Joi.number().required().max(100).error(new Error("Participation not receivied...")),
  }),

}, { abortEarly: false }), DataController.create);

export default routes;
