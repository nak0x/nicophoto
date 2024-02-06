const AlbumsRouter = require("express").Router();

const { checkAdmin, checkUser } = require("../middlewares/auth.middleware");

const albumsController = require("../controllers/albums.controller");

AlbumsRouter.route("/albums").get(checkAdmin, albumsController.getAlbums);

module.exports = AlbumsRouter;
