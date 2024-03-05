const Router = require('express').Router();

Router.get("/", (req,res)=>{
  res.render("client", {
    tableau: [
      {
        imagePath: "lien url",
        name: "name"
      },
      {
        imagePath: "lien url",
        name: "name"
      },
      {
        imagePath: "lien url",
        name: "name"
      },
      {
        imagePath: "lien url",
        name: "name"
      }
    ],
    titreAlbum : "Titre"
  })
})

module.exports = Router;