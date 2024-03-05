const AlbumsRouter = require("express").Router();

const { authToken } = require("../../middlewares/auth.middleware");

const albumsController = require("../../controllers/albums.controller");

AlbumsRouter.route("/").get(
  /*authToken("admin"),*/ albumsController.getAllAlbumUIDs
);

module.exports = AlbumsRouter;
