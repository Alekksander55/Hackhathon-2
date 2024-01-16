const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();


// Registration endpoint
router.post("/register", async (req, res) => {
  try {
    const { email, password } = await req.body;
    // console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );
    res.redirect("/login")
    // res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = await req.body;
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Mail doesnt exist in the database" });
    }
    const user = userResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create and send a TOKEN for authentication
    const token = jwt.sign({ userId: user.id }, "unicorn", {
      expiresIn: "1h",
      
    });
    // res.setHeader('Authorization', `${token}`); since the authentication is not working the login will directly redirect to the dashboard
    // res.status(200).json({ token });
    res.redirect("/dashboard")
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
