const Router = require("express").Router();

// Auth middleware
const { auth } = require("../middlewares/auth.middleware");

// Importing routes
const albumRoutes = require("./api/album.routes");
const albumsRoutes = require("./api/albums.routes");
const imageRoutes = require("./api/images.routes");
const authRoutes = require("./api/auth.routes");

// Routing

Router.use("/auth", authRoutes);
Router.use("/albums", auth('api', 'admin'), albumsRoutes);
Router.use("/album", albumRoutes);

module.exports = Router;
