const Joi = require("joi");

exports.albumSchemaPost = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().required(),
  pass: Joi.string().required().pattern(new RegExp(process.env.PASS_POLICY)),
  date: Joi.date().required(),
  uri: Joi.string().allow(null),
});

exports.albumSchemaPatch = Joi.object({
  title: Joi.string().allow(null),
  desc: Joi.string().allow(null),
  pass: Joi.string().pattern(new RegExp(process.env.PASS_POLICY)).allow(null),
  date: Joi.date().allow(null),
  uri: Joi.string().allow(null),
});
