require("dotenv").config();
const express = require("express");
const path = require("path");

// const routeur = require("./router/index.routes");
const { initTables, insertAdmin } = require("./database/database_utils");

// Init db
initTables();

insertAdmin(process.env.ADMIN_LOGIN, process.env.ADMIN_PASS);

const routeur = require("./router/index.routes");
const internal = require("stream");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use("/api", routeur);

app.use("*", (req, res) => {
  res
    .status(404)
    .sendFile("/404.html", { root: path.join(__dirname, "public") });
});
app.use(express.static("/public"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
