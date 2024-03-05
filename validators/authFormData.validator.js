const Joi = require("joi");

exports.LoginFormData = Joi.object({
  id: Joi.string().required(),
  pass: Joi.string().required()
})