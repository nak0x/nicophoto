const { renderAlbumsPage } = require("../../controllers/albums.controller");
const { renderAlbumPage } = require("../../controllers/album.controller");

const Router = require("express").Router();

// Router.get("/", (req, res) => {
//   // res.render("admin_login");
// });

Router.get("/album/:albumUID", renderAlbumPage);
Router.get("/", renderAlbumsPage);

// Router.get("/create-album", (req, res) =>{
//   res.render("album")
// } );

module.exports = Router;
