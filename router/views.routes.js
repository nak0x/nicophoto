const Router = require("express").Router({mergeParams: true});

const { auth } = require("../middlewares/auth.middleware");

const adminRoutes = require("./pages/admin.routes");
const albumRoutes = require("./pages/album.routes")

Router.use("/admin", auth('render', 'admin'), adminRoutes);
Router.use(albumRoutes)

module.exports = Router;
