const Router = require("express").Router({mergeParams: true});

const {auth} = require("../middlewares/auth.middleware");

const adminRoutes = require("./pages/admin.routes");
const albumRoutes = require("./pages/album.routes")

// Router.use("/", (req, res) => {
  // res.render('index');
// })

Router.use("/admin", /*auth.authToken("admin"),*/ adminRoutes);
Router.use(/*auth('render'),*/ albumRoutes);
// Router.use("/album/:id", /*auth.authToken("album"), */ albumRoutes);

module.exports = Router;
