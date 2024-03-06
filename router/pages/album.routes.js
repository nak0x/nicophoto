const AlbumRouter = require("express").Router();

// Middlewares
const { auth } = require("../../middlewares/auth.middleware");

// Controllers
const {
  renderAlbumPageByAlbumURL,
} = require("../../controllers/album.controller");

AlbumRouter.get("/:albumURL", auth("render"), renderAlbumPageByAlbumURL);

module.exports = AlbumRouter;
