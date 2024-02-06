const Router = require("express").Router();

// Importing routes

const adminRoutes = require("./auth.routes");
const imageRoutes = require("./images.routes");
const albumRoutes = require("./album.routes");
const albumsRoutes = require("./albums.routes");
const authRoutes = require("./auth.routes");

// Routing

Router.use("/auth", authRoutes);

module.exports = Router;
