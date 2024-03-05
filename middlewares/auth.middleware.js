// Auth middleware is in charge of validating the auth of the req
// Cf:  Auth section api doc

const { validateUser, validateAdmin } = require("../validators/user.validator.js");
const tokenController = require("../controllers/tokens.controller.js")
const { getAdminCredentials } = require("../database/database_utils.js");

const renderOptions = {
  PAGE_TITLE: "Login"
}

/**
 * Auth the bearer token
 * @param {String} type Type of the auth "render" for views routing and "api" for api routes
 * @param {String} permission The permission level of the route [user, admin] if void => pass the middleware
 * @returns {Function} The permission corresponding middleware.
 */
exports.auth = (type="render", permission = "album") => {
  switch(permission){
    case "admin":
      if(type == 'render'){
        return adminAuth;
      }
      return authAdminToken;
    default:
      if(type == 'render'){
        return albumAuth;
      }
      return authUserToken;
  }
}

/**
 * Auth middleware for render admin grade views
 * @param {Express.Request} req HTTP Request
 * @param {Express.Response} res HTPP Response
 * @param {Function} next next middleware
 * @returns {Object | Express.Response} 
 */
function adminAuth(req, res, next)
{
  // Check if the admin is already logged in
  if(!req.session.authToken) return res.render("admin_login", renderOptions);

  // Read the token data
  const tokenData = tokenController.readAdminToken(req.session.authToken);
  if(tokenData.err){
    console.error(err)
    return res.render('admin_login', renderOptions)
  }

  // Check if the token data is valid
  const data = getAdminCredentials(tokenData.uuid);
  if(data == {}){
    return res.render('admin_login', renderOptions);
  }else{
    return next();
  }
}

/**
 * Auth middleware for render album grade views
 * @param {Express.Request} req HTTP Request
 * @param {Express.Response} res HTPP Response
 * @param {Function} next next middleware
 * @returns {Object | Express.Response} 
 */
function albumAuth(req, res, next)
{
  // Check if the admin is already logged in
  if(!req.session.authToken) return res.render("album_login", renderOptions);

  // Read the token data
  const tokenData = tokenController.readAccessToken(req.session.authToken);
  if(tokenData.err){
    console.error(err)
    return res.render('album_login', renderOptions)
  }

  // Check if the token data is valid
  const data = getCredentials(tokenData.uuid);
  if(data == {}){
    return res.render('album_login', renderOptions);
  }else{
    return next();
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
  const authToken = req.headers['authorization'];
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
