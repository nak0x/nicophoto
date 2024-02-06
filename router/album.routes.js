const AlbumRouter = require("express").Router();

const { checkAdmin, checkUser } = require("../middlewares/auth.middleware");

const albumController = require("../controllers/album.controller");

AlbumRouter.route("/album").post(checkAdmin, albumController.createAlbum);

module.export = AlbumRouter;
