import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PropertiesController from '@modules/properties/infra/http/controllers/PropertiesController';

const propertiesRouter = Router();
const propertiesController = new PropertiesController();

propertiesRouter.get('/', propertiesController.index);

propertiesRouter.get('/:id', propertiesController.show);

propertiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      descricao: Joi.string().required(),
      area: Joi.number().required(),
      valor: Joi.number().required(),
      endereco: {
        logradouro: Joi.string().required(),
        numero: Joi.string().required(),
        complemento: Joi.string().required(),
        bairro: Joi.string().required(),
        cep: Joi.string().required(),
        cidade: Joi.string().required(),
        estado: Joi.string().required(),
      },
    },
  }),
  propertiesController.create,
);

propertiesRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      titulo: Joi.string(),
      descricao: Joi.string(),
      area: Joi.number(),
      valor: Joi.number(),
      endereco: {
        logradouro: Joi.string(),
        numero: Joi.string(),
        complemento: Joi.string(),
        bairro: Joi.string(),
        cep: Joi.string(),
        cidade: Joi.string(),
        estado: Joi.string(),
      },
    },
  }),
  propertiesController.update,
);

propertiesRouter.delete('/:id', propertiesController.delete);

export default propertiesRouter;
