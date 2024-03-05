const Router = require("express").Router({mergeParams: true});

const { getAlbumByURL } = require("../controllers/album.controller");
const { auth } = require("../middlewares/auth.middleware");

const adminRoutes = require("./pages/admin.routes");
const albumRoutes = require("./pages/album.routes")

Router.use("/admin", auth('render', 'admin'), adminRoutes);
Router.get("/:album_slug", auth('render'), getAlbumByURL);

module.exports = Router;
