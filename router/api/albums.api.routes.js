const AlbumsRouter = require("express").Router();
const albumsController = require("../../controllers/albums.controller");

AlbumsRouter.route("/").get(albumsController.getAllAlbumUIDsFromAPI);

module.exports = AlbumsRouter;
