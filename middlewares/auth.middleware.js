// Auth middle wear is in charge of validating the auth of the req
// Cf:  Auth section api doc

const authController = require("../controllers/auth.controller.js");
const { validateUser, validateAdmin } = require("../validators/user.validator.js");

/**
 * Auth the bearer token
 * @param {String} permission The permission level of the route [user, admin] if void => pass the middleware
 * @returns {Function} The permission corresponding middleware.
 */
exports.authToken = (permission) => {
  // State machine on permission
  switch(permission){
    case "user":
      return authUserToken;
    case "admin":
      return authAdminToken;
    default:
      return (req, res, next)=>{
        next();
      } 
      break;
  }
} 

/**
 * Auth and validate the user token
 * @param {Express.Request} req The request object
 * @param {Express.Response} res The response object
 * @param {Express.next} next Pass to the next middleware
 * @returns void
 */
async function authUserToken (req, res, next){  
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
    let userValidaiton = await validateUser(decodedData);
    if(userValidaiton.success){
      req.user = {
        ...userValidaiton.value,
        admin: false
      }
      next();
    }
  }catch(error) {
    return res.status(403).send("You are not allowed to access to this ressources");
  }
}

/**
 * auth an admin token
 * @param {Express.Request} req The request object
 * @param {Express.Response} res The response object
 * @param {Express.next} next Goto the next middleware
 * @returns void
 */
async function authAdminToken (req, res, next){

  // Get the token from the auth headers
  const authHeader = req.headers['authorization'];
  const token = authToken && authToken.split(" ");

  // Check the token presence
  if(!token) return res.status(403).json({
    success: false,
    error: {
      code: 403,
      error: "You are not allowed to access to this ressources",
    }
  });

  // Verify the token
  try{
    let decodedData = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET)
    let adminValidation = await validateAdmin(decodedData)
    if(adminValidation.success){
      req.user = {
        ...adminValidation.value,
        admin: true,
      }
      next();
    }
  }catch(error){
    return res.status(403).send("You are not allowed to access to this ressources");
  }

}

exports.checkUser = ()=>{return;}