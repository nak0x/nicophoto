const AlbumRouter = require('express').Router();

const { getAlbumByURL } = require("../../controllers/album.controller");

AlbumRouter.get("/:album_slug", getAlbumByURL)

module.exports = AlbumRouter;