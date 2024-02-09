// Auth middle wear is in charge of validating the auth of the req
// Cf:  Auth section api doc

const authController = require("../controllers/auth.controller.js");
const { Database } = require("../database/database.js");

export authToken = async (req, res, next) => {
  
  // Check if the token is a formal bearer

  // Check if the token is valid

  // Return the validation or not

}

export authAdminToken = async (req, res, next) => {

  // Check the validity of the token
  //
  // Return the result of the validation

}
