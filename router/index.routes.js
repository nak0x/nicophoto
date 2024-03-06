const Router = require("express").Router();

// Auth middleware
const { auth } = require("../middlewares/auth.middleware");

// Importing routes
const albumRoutes = require("./api/album.api.routes");
const albumsRoutes = require("./api/albums.api.routes");
const imageRoutes = require("./api/images.api.routes");
const authRoutes = require("./api/auth.api.routes");

// Routing

Router.use("/auth", authRoutes);
Router.use("/albums", /*auth("api", "admin"),*/ albumsRoutes);
Router.use("/album", albumRoutes);

module.exports = Router;
