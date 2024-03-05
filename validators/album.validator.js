const Joi = require("joi");

exports.albumSchemaPost = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  password: Joi.string().required().pattern(new RegExp(process.env.PASS_POLICY)),
  date: Joi.date().required(),
  url: Joi.string().allow(null),
});

exports.albumSchemaPatch = Joi.object({
  title: Joi.string().allow(null),
  description: Joi.string().allow(null),
  password: Joi.string().pattern(new RegExp(process.env.PASS_POLICY)).allow(null),
  date: Joi.date().allow(null),
  url: Joi.string().allow(null),
});
