const AlbumsRouter = require("express").Router();
const albumsController = require("../../controllers/albums.controller");

AlbumsRouter.route("/")
  .get(albumsController.getAlbums);

module.exports = AlbumsRouter;
