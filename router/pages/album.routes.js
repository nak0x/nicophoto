const AlbumRouter = require('express').Router();

AlbumRouter.get("/test", (req,res)=>{
  res.render("client", {
    tableau: [
      {
        url: "https://picsum.photos/id/0/5000/3333",
        imagePath: "lien url",
        name: "name"
      },
      {
        url: "https://picsum.photos/id/1/5000/3333",
        imagePath: "lien url",
        name: "name"
      },
      {
        url: "https://picsum.photos/id/2/5000/3333",
        imagePath: "lien url",
        name: "name"
      },
      {
        url: "https://picsum.photos/id/3/5000/3333",
        imagePath: "lien url",
        name: "name"
      },
      {
        url: "https://picsum.photos/id/4/5000/3333",
        imagePath: "lien url",
        name: "name"
      }
    ],
    TitleAlbum : "Titre",
    Date: "25/12/03",
    Description: "sjpoiioierj ierhgoiejrog ierge"
  })
})
// Middlewares
const {auth} = require("../../middlewares/auth.middleware")

// Controllers
const { getAlbumByURL } = require("../../controllers/album.controller");

AlbumRouter.get("/:album_slug", auth('render'), getAlbumByURL)

module.exports = AlbumRouter;