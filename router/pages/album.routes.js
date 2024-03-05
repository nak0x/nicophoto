const AlbumRouter = require("express").Router();

const {
  renderAlbumPageByAlbumURL,
} = require("../../controllers/album.controller");

// Middlewares
const {auth} = require("../../middlewares/auth.middleware")

// Controllers
const { getAlbumByURL } = require("../../controllers/album.controller");

AlbumRouter.get("/:album_slug", auth('render'), getAlbumByURL)
AlbumRouter.get("/:albumURL", renderAlbumPageByAlbumURL);

module.exports = AlbumRouter;
