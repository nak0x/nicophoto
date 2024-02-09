require('dotenv').config();
const express = require('express');
const fs = require("fs");

const { initTables, insertAdmin} = require("./database/database_utils");

// Init db
initTables();

insertAdmin(process.env.ADMIN_LOGIN, process.env.ADMIN_PASS);

const routeur = require("./router/index.routes");
const internal = require('stream');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.use("/api", routeur);

app.use("*", async (req, res)=>{
  res.status(404).sendFile(await fs.readFile("./public/404.html"));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});
