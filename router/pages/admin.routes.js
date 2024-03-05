const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.render("admin", {
    PAGE_TITLE: "Administration",
  });
});

Router.get("/create-album", (req, res) => {
  res.render("album");
});

module.exports = Router;
