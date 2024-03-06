const Router = require("express").Router();

const { auth } = require("../middlewares/auth.middleware");

const adminRoutes = require("./pages/admin.routes");
const albumRoutes = require("./pages/album.routes");

// Router.use("/", (req, res) => {
// res.render('index');
// })

Router.use("/admin", /* auth("render", "admin"), */ adminRoutes);
Router.use("/", albumRoutes);

module.exports = Router;
