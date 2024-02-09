// Auth middle wear is in charge of validating the auth of the req
// Cf:  Auth section api doc

const authController = require("../controllers/auth.controller.js");
const { Database } = require("../database/database.js");

export authToken = async (req, res, next) => {
  
  // Check if the token is a formal bearer

  // Check if the token is valid

  // Go to the next middlewear if the auth is ok or return {
  //  status: 403,
  //  data: {},
  //  error: {
  //	code: 403,
  //	message: Auth token as not being validate
  // }



}

export authAdminToken = async (req, res, next) => {

  

}
