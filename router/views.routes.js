const Router = require("express").Router({mergeParams: true});

const { getAlbumByURL } = require("../controllers/album.controller");
const auth = require("../middlewares/auth.middleware");
const AlbumRouter = require("./api/album.routes");

const adminRoutes = require("./pages/admin.routes");

// Router.use("/", (req, res) => {
  // res.render('index');
// })

Router.use("/admin", /*auth.authToken("admin"),*/ adminRoutes);
Router.get("/:album_slug", getAlbumByURL);

// Router.use("/album/:id", /*auth.authToken("album"), */ albumRoutes);

module.exports = Router;
