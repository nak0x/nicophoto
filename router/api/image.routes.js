const ImageRouter = require("express").Router({ mergeParams: true });

const { authToken } = require("../../middlewares/auth.middleware.js");

const imageController = require("../../controllers/image.controller");

ImageRouter.route("/").post(
  /*authToken("admin"),*/ imageController.createImage
);

ImageRouter.route("/:image_uid")
  .get(/*authToken("user"),*/ imageController.getImage)
  .patch(/*authToken("admin"),*/ imageController.updateImage)
  .delete(/*authToken("admin"),*/ imageController.deleteImage);

module.exports = ImageRouter;
