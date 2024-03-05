const AlbumRouter = require("express").Router();

const {
  renderAlbumPageByAlbumURL,
} = require("../../controllers/album.controller");

AlbumRouter.get("/:albumURL", renderAlbumPageByAlbumURL);

module.exports = AlbumRouter;
