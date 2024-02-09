const Joi = require("joi");
const Bcrypt = require("bcrypt");
const { getCredentials } = require("../database/database_utils")

// User access to album validation object
const userValidation = Joi.object({
  albumId: Joi
    .string()
    .required()
    .custom(async (albumId, helper)=>{
      let credentials = await getCredentials(albumId);
      if(credentials == {}){
        helper.error("any.invalid")
        return helper.message("The album seems to not exist")
      }
      return true;
    }),
    pass: Joi
    .string()
    .required()
    .custom(async (encryptedPass, helper)=>{
      let credentials = await getCredentials(albumId);
      if(credentials == {}){
        helper.error("any.invalid")
        return helper.message('Wrong password')
      }
      if(encryptedPass == credentials.pass){
        return credentials.pass
      }
    })
})

exports.validateUser = async (decodedJwt)=>{
  const validation = await userValidation.validateAsync(decodedJwt);
  if(validation.error){
    return false
  }
  return true
}
