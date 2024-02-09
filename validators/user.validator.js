const Joi = require("joi");
const Bcrypt = require("bcrypt");
const {  }

// User access to album validation object
const userValidation = Joi.object({
  albumId: Joi
    .string()
    .required()
    .custom(async (albumId, helper)=>{
      
    })
})

exports.validateUser = aysnc (decodedJwt){

}