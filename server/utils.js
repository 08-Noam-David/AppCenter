import Joi from 'joi';

/*
 * The JSON properties and the table column names don't match one-to-one.
 * The function takes a raw SQL result and makes sure it does,
 * In addition to converting snake_case to camelCase
 */
const normalizeAppProperties = (app) => {
  const normApp = { ...app };

  normApp.id = normApp.app_id;
  delete normApp.app_id;

  normApp.imageUrl = normApp.image_url;
  delete normApp.image_url;

  normApp.name = normApp.app_name;
  delete normApp.app_name;

  normApp.desc = normApp.description;
  delete normApp.description;

  normApp.companyName = normApp.company_name;
  delete normApp.company_name;

  normApp.createdAt = normApp.created_at;
  delete normApp.created_at;

  return normApp;
};

const appSchema = Joi.object({
  imageUrl: Joi.string().max(300).empty(''),
  name: Joi.string()
    .required()
    .min(4)
    .max(30)
    .regex(/[a-zA-Z0-9][a-zA-Z0-9\s]*[a-zA-Z0-9]/),
  price: Joi.number().required().precision(2).min(0.0),
  desc: Joi.string().max(500).empty(''),
  companyName: Joi.string().max(30).empty(''),
});

const validateApp = (app) => appSchema.validateAsync(app, { convert: false });

export { normalizeAppProperties, validateApp };
