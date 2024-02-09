// Auth middle wear is in charge of validating the auth of the req
// Cf:  Auth section api doc

const authController = require("../controllers/auth.controller.js");
const bcrypt = require('bcrypt');
const {}

// ONLY TESTING DO NOT PUSH TO PROD !!!!!
const getAlbumCreds = async (id) => {
  if(id == "test_album_id"){
    return {
      id: "test_album_id", 
      pass: bcrypt.hash("superPass", await bcrypt.genSalt(16))
    }
  }
  else{return {}}
}

// Joi data validation schema

exports.authToken = async (req, res, next) => {
  
  // Parse the body



  // Check if the token is a formal bearer
  const validation = await getAlbumCreds()

  // Check if the token is valid

  // Return the validation or not

}

exports.authAdminToken = async (req, res, next) => {

  // Check the validity of the token
  
  // Return the result of the validation

}
