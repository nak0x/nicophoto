const Router = require("express").Router({ mergeParams: true });

const auth = require("../middlewares/auth.middleware");
const albumRoutes = require("./pages/album.routes");

const adminRoutes = require("./pages/admin.routes");

// Router.use("/", (req, res) => {
// res.render('index');
// })

Router.use("/", albumRoutes);

Router.use("/admin", /*auth.authToken("admin"),*/ adminRoutes);
// Router.use("/album/:id", /*auth.authToken("album"), */ albumRoutes);

module.exports = Router;
