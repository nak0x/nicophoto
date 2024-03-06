const Joi = require("joi");
const Bcrypt = require("bcrypt");
const { getCredentials, getAdminCredentials } = require("../database/database_utils")

// User access to album validation object
/* 
{
  uid: 'b21b907a-6d2a-4cdf-8628-57d90d2f0ff3',
  title: 'My test album',
  url: 'this-is-a-test',
  password: '$2b$10$nEkQ4drq9QDHIIsvxFeyE.8JWCGyWAcXIJjA1ZnQwxnxDqXMIABvG',
  description: 'ojdzaiojd zaj dijzaijd ziajid jzaidjiazj ',
  date: '2024-04-10',
  iat: 1709721531,
  exp: 1709725131
}
*/
const userValidation = Joi.object({
  uid: Joi.string().required(),
  title: Joi.string().required(),
  url: Joi.string().required(),
  password: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.string().required(),
  iat: Joi.number(),
  exp: Joi.number()
})

// Admin access validation object
const adminValidation = Joi.object({
  login_id: Joi
    .string()
    .required(),
  pass: Joi
    .string()
    .required(),
  iat: Joi.number(),
  exp: Joi.number()
})

exports.validateUser = async (decodedJwt)=>{
  return await userValidation.validateAsync(decodedJwt);
}

exports.validateAdmin = async (decodedJwt) => { 
  return await adminValidation.validateAsync(decodedJwt);
}