const Joi = require("joi");
const Bcrypt = require("bcrypt");
const { getCredentials, getAdminCredentials } = require("../database/database_utils")

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
      return albumId;
    }),
    pass: Joi
    .string()
    .required()
    .custom(async (encryptedPass, helper)=>{
      let credentials = await getCredentials(albumId);
      if(credentials != {} && encryptedPass == credentials.pass) {
        return credentials.pass
      }
      helper.message('Wrong password')
      return helper.error("any.invalid")
    })
})

// Admin access validation object
const adminValidation = Joi.object({
  login_id: Joi
    .string()
    .required()
    .custom(async (login_id, helper)=> {
      let admin = await getAdminCredentials(login_id);
      if(admin == {}){
        helper.message("The album seems to not exist")
        return helper.error("any.invalid")
      }
      return login_id;
    }),
  pass: Joi
    .string()
    .required()
    .custom(async (pass, helper)=> {
      let admin = await getAdminCredentials(login_id);
      if(admin == {} && pass == admin.pass){
        return admin.pass
      }
      helper.error("any.invalid")
      return helper.message("The album seems to not exist")
    })
})

exports.validateUser = async (decodedJwt)=>{
  return await userValidation.validateAsync(decodedJwt);
}

exports.validateAdmin = async (decodedJwt) => { 
  return await adminValidation.validateAsync(decodedJwt);
}