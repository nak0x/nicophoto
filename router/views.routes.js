const Router = require("express").Router();

const auth = require("../middlewares/auth.middleware");

const adminRoutes = require("./pages/admin.routes");
const albumRoutes = require("./pages/album.routes");

Router.use("/test", (req, res) => {
  res.render("test", {
    name: "Théo",
    data: [
      "Test 1",
      "Test 2",
      "Test 3"
    ]
  });
});
Router.use("/admin", auth.authToken("admin"), adminRoutes);
Router.use("/album/:id", auth.authToken("album"), albumRoutes);

module.exports = Router;
