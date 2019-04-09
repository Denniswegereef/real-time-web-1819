const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const chalk = require("chalk");
require("dotenv").config();

const app = express();

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    partialsDir: __dirname + "/views/partials/"
  })
);

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
