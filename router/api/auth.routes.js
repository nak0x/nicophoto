<<<<<<< HEAD:router/auth.routes.js
const AuthRouter = require("express").Router();

// Require controller
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware")

AuthRouter.route("/")
  .post(authController.auth)

// TO ADD if time is enouf
// AuthRouter.route("/renew")
//   .post(authMiddleware.authToken, authController.renewToken)

module.exports = AuthRouter;
=======
const AuthRouter = require("express").Router();

// Require controller
const authController = require("../../controllers/auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

AuthRouter.route("/").post(authController.auth);

// TO ADD if time is enouf
// AuthRouter.route("/renew")
//   .post(authMiddleware.authToken, authController.renewToken)

module.exports = AuthRouter;
>>>>>>> theo:router/api/auth.routes.js
