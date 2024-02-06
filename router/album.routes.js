const AlbumRouter = require("express").Router();

const { checkAdmin, checkUser } = require("../middlewares/auth.middleware");

const albumController = require("../controllers/album.controller");

AlbumRouter.route("/album").post(checkAdmin, albumController.createAlbum);

AlbumRouter.route("/album/:id")
  .get(checkAdmin, albumController.getAlbum)
  .get(checkUser, albumController.getAlbum)
  .patch(checkAdmin, albumController.updateAlbum);

module.export = AlbumRouter;
