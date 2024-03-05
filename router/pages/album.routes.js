const AlbumRouter = require('express').Router();

AlbumRouter.get("/test", (req,res)=>{
  res.render("client", {
    tableau: [
      {
        index: 0,
        url: "https://fastly.picsum.photos/id/23/3887/4899.jpg?hmac=2fo1Y0AgEkeL2juaEBqKPbnEKm_5Mp0M2nuaVERE6eE",
        imagePath: "lien url",
        name: "name"
      },
      {
        index: 1,
        url: "https://fastly.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI",
        imagePath: "lien url",
        name: "name"
      },
      {
        index: 2,
        url: "https://picsum.photos/id/2/5000/3333",
        imagePath: "lien url",
        name: "name"
      },
      {
        index: 3,
        url: "https://picsum.photos/id/3/5000/3333",
        imagePath: "lien url",
        name: "name"
      },
      {
        index: 4,
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

module.exports = AlbumRouter;