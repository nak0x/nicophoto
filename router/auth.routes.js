const AuthRouter = require("express").Router();

// Require controller
const authController = require("../controllers/auth.controller");

AuthRouter.route("/")
  .post(authController.auth)

AuthRouter.route("/renew")
  .post(authController.authToken, authController.renewToken)

module.exports = AuthRouter;
