<<<<<<< HEAD
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
=======
const Router = require("express").Router();

// Importing routes

const imageRoutes = require("./api/images.routes");
const albumRoutes = require("./api/album.routes");
const albumsRoutes = require("./api/albums.routes");
const authRoutes = require("./api/auth.routes");

// Routing

Router.use("/auth", authRoutes);

Router.use("/albums", albumsRoutes);
Router.use("/album", albumRoutes);

module.exports = Router;
>>>>>>> theo
