const { renderAlbumsPage } = require("../../controllers/albums.controller");

const Router = require("express").Router();

// Router.get("/", (req, res) => {
//   // res.render("admin_login");
// });

Router.get("/", renderAlbumsPage);

Router.get("/create-album", (req, res) => {
  // Send create album page
});

module.exports = Router;
