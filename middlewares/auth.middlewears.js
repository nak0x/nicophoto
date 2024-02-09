// Auth middle wear is in charge of validating the auth of the req
// Cf:  Auth section api doc

const authController = require("../controllers/auth.controller.js");


exports.authToken = async (req, res, next) => {
  
  // Get the authorisation from the headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Check if the token is a formal bearer
  if(!token) return res.sendStatus(403).json({
    success: false,
    error: {
      code: 403,
      error: "No token provided"
    }
  });

  // Verfify the token
  try {
    let decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  } catch (error) {
    
  }

}

exports.authAdminToken = async (req, res, next) => {

  // Check the validity of the token
  
  // Return the result of the validation

}
