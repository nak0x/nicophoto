require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

// self-explanatory
app.set("view engine", "ejs");

// const routeur = require("./router/index.routes");
const { initTables, insertAdmin } = require("./database/database_utils");

// Init db
initTables();
insertAdmin(process.env.ADMIN_LOGIN, process.env.ADMIN_PASS);

// Requires routers
const apiRouteur = require("./router/index.routes");
const viewsRouter = require("./router/views.routes");
const internal = require("stream");
const { log } = require("console");

// App def
const port = process.env.PORT || 3000;

app.use(express.json());

// Session definition
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next)=>{
  console.log(req.session);
  next();
})

app.use("/", viewsRouter);
app.use("/api", apiRouteur);
app.use("/public", express.static("public"));

// app.use("/", (req, res) => {
//   res.render("projethomepage");
// });

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
