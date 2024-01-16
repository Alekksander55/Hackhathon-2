const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const dbRouter = require("./routes/db-routes.js");
require("dotenv").config();
const app = express();
const {emailExist, matchPassword} = require('./config/passport-config.js')

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = req.flash();
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});

app.use("/", dbRouter);

