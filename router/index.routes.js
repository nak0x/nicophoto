const Router = require("express").Router();

// Importing routes

const adminRoutes = require("./admin.routes");
const imageRoutes = require("./images.routes");
const albumRoutes = require("./albums.routes");
const authRoutes = require("./auth.routes");

// Routing

Router.use('/auth', authRoutes);

module.exports = Router;
