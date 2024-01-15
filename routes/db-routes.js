const express = require("express");

const {
  getAllUsers,
  getUserById,
  renderLogin,
  renderIndex,
  renderRegister,
  createUser
} = require("../controllers/db-controller.js");

const dbRouter = express.Router();

dbRouter.get("/", renderIndex);
dbRouter.get("/login", renderLogin);
dbRouter.get("/register", renderRegister);
dbRouter.post("/register", createUser)
dbRouter.get("/users", getAllUsers);
dbRouter.get("/users/:id", getUserById);

module.exports = dbRouter;
