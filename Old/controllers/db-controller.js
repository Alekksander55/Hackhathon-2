const { db } = require("../config/db.js");
const bcrypt = require("bcrypt");

// render the login page
const renderLogin = (req, res) => {
  try {
    res.render("login.ejs");
  } catch (error) {
    res.render("error in login");
    console.log(error);
  }
};

// render the register page
const renderRegister = (req, res) => {
  try {
    res.render("register.ejs");
  } catch (error) {
    res.render("error in register");
    console.log(error);
  }
};

//render the index page, after getting logged
const renderIndex = (req, res) => {
  try {
    res.render("index.ejs", { user: "Alex" });
  } catch (error) {
    res.render("error in index");
    console.log(error);
  }
};

// create a new User from the register form
const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = await db("users").insert({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log("DB has been accessed");
    req.flash('success', 'Registration success')
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.flash('fail', 'User already exist in the DB')
    res.redirect("/register");
  }
};

// get all the users from the database
const getAllUsers = async (req, res) => {
  try {
    const data = await db("users").select("*").orderBy("fullname");
    console.log("DB has been accessed");
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

// get user by ID from the database
const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await db("users").select("*").where({ id: id });
    console.log("DB has been accessed");
    if (data.length === 0) return res.sendStatus(404);
    res.json(data);
  } catch (error) {
    res.sendStatus(404);
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  renderLogin,
  renderIndex,
  renderRegister,
  createUser,
};
