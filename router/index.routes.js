const Router = require("express").Router();

// Importing routes

const albumRoutes = require("./album.routes");
const albumsRoutes = require("./albums.routes");
const authRoutes = require("./auth.routes");

// Routing

Router.use("/auth", authRoutes);
Router.use("/albums", albumsRoutes);
Router.use("/album", albumRoutes);

module.exports = Router;
