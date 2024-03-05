<<<<<<< HEAD:router/albums.routes.js
const AlbumsRouter = require("express").Router();

const { authToken } = require("../middlewares/auth.middleware");

const albumsController = require("../controllers/albums.controller");

AlbumsRouter.route("/").get(/*authToken("admin"),*/ albumsController.getAlbums);

module.exports = AlbumsRouter;
=======
const AlbumsRouter = require("express").Router();

const { authToken } = require("../../middlewares/auth.middleware");

const albumsController = require("../../controllers/albums.controller");

AlbumsRouter.route("/").get(/*authToken("admin"),*/ albumsController.getAlbums);

module.exports = AlbumsRouter;
>>>>>>> theo:router/api/albums.routes.js
