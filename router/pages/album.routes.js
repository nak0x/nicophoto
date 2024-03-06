const AlbumRouter = require('express').Router();

// Middlewares
const {auth} = require("../../middlewares/auth.middleware")

// Controllers
const { getAlbumByURL } = require("../../controllers/album.controller");

AlbumRouter.get("/:album_slug", auth('render'), getAlbumByURL)

module.exports = AlbumRouter;