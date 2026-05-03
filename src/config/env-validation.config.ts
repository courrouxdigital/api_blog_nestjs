import * as Joi from 'joi';

export const envValidation = Joi.object({
  // NEST
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(4000),
  // DATABASE
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  // PGADMIN
  PGADMIN_PORT: Joi.number().default(8080),
  PGADMIN_EMAIL: Joi.string().default('admin@correo.com'),
  PGADMIN_PASSWORD: Joi.string().default('admin'),
});