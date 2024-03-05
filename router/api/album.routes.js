const AlbumRouter = require("express").Router({ mergeParams: true });

const { authToken } = require("../../middlewares/auth.middleware.js");

const albumController = require("../../controllers/album.controller");

const imagesController = require("../../controllers/images.controller");

const imageRoutes = require("./image.routes.js");

AlbumRouter.route("/").post(
  /*authToken("admin"),*/ albumController.createAlbum
);

AlbumRouter.route("/:album_uid")
  .get(/*authToken("admin"),*/ albumController.getAlbum)
  .get(/*authToken("user"),*/ albumController.getAlbum)
  .patch(/*authToken("admin"),*/ albumController.updateAlbum)
  .delete(/*authToken("admin"),*/ albumController.deleteAlbum);

AlbumRouter.use("/:album_uid/image", imageRoutes);

AlbumRouter.use("/:album_uid/images/download", imagesController.downloadImages);

AlbumRouter.use("/:album_uid/images", imagesController.getAllAlbumImages);

module.exports = AlbumRouter;
