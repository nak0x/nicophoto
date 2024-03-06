const ImageRouter = require("express").Router({ mergeParams: true });

const { auth } = require("../../middlewares/auth.middleware.js");

const imageController = require("../../controllers/image.controller.js");

ImageRouter.route("/").post(
  auth("api", "admin"), imageController.createImage
);

ImageRouter.route("/:image_uid")
  .get(auth('api'), imageController.getImage)
  .patch(auth('api', 'admin'), imageController.updateImage)
  .delete(auth('api', 'admin'), imageController.deleteImage);

module.exports = ImageRouter;
