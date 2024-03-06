const AlbumRouter = require("express").Router({ mergeParams: true });

const { auth } = require("../../middlewares/auth.middleware.js");

const albumController = require("../../controllers/album.controller.js");

const imagesController = require("../../controllers/images.controller.js");

const imageRoutes = require("./image.api.routes.js");

AlbumRouter.route("/").post(
  /*auth('api', 'admin'),*/ albumController.createAlbum
);

AlbumRouter.route("/:album_uid")
  .get(/*auth('api', 'admin'), */ albumController.getAlbum)
  .get(/*auth('api'), */ albumController.getAlbum)
  .patch(/*auth('api', 'admin'), */ albumController.updateAlbum)
  .delete(/*auth('api', 'admin'), */ albumController.deleteAlbum);

AlbumRouter.use("/:album_uid/image", imageRoutes);

AlbumRouter.route("/:album_uid/images/download").post(imagesController.downloadImages);

// AlbumRouter.use("/:album_uid/images", imagesController.getAllAlbumImages);

module.exports = AlbumRouter;
