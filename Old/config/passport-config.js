const LocalStrategy = require("passport").Strategy;
const { db } = require("./db.js");
const bcrypt = require("bcrypt");


// check if the user email is in the database
const emailExist = async (email) => {
  const data = await db("users").select("*").where({ email: email });
  if (data.length == 0) return false;
  return data[0];
};


// check if the given password is correct
const matchPassword = async (password, hashpassword) => {
    const match = await bcrypt.compare(password, hashpassword);
    return match
}


module.exports = {emailExist, matchPassword}
