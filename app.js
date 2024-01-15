const express = require("express");
const dbRouter = require("./routes/db-routes.js");
require("dotenv").config();
const app = express();
const session = require("express-session");
const flash = require("express-flash");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash())


app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});

app.use("/", dbRouter);
