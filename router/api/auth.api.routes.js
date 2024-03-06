const AuthRouter = require("express").Router();

// Require controller
const authController = require("../../controllers/auth.controller");
const { auth } = require("../../middlewares/auth.middleware");

AuthRouter.route("/login").post(authController.login);

AuthRouter.route("/logout").post(auth("api"), authController.logout);

module.exports = AuthRouter;
