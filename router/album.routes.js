const AlbumRouter = require("express").Router();

const { authToken } = require("../middlewares/auth.middleware.js");

const albumController = require("../controllers/album.controller");

AlbumRouter.route("/").post(
  /*authToken("admin"),*/ albumController.createAlbum
);

AlbumRouter.route("/:album_uid")
  .get(/*authToken("admin"),*/ albumController.getAlbum)
  .get(/*authToken("user"),*/ albumController.getAlbum)
  .patch(/*authToken("admin"),*/ albumController.updateAlbum)
  .delete(/*authToken("admin"),*/ albumController.deleteAlbum);

module.exports = AlbumRouter;
