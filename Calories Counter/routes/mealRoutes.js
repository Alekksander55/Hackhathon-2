const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const userRoutes = require('./userRoutes')

const router = express.Router();

// Middleware function to authenticate the user based on the JWT
function authenticateToken(req, res, next) {
    // console.log(req.header)
    // const token = req.header('Authorization');
    // console.log(token)
    // if (!token) {
    //     return res.status(401).json({ error: 'Unauthorized: No token' });
    // }

    // jwt.verify(token, 'unicorn', (err, user) => {
    //     if (err) {
    //         console.error('Token Verification Error:', err);
    //         return res.status(403).json({ error: 'Forbidden: Invalid Token' });
    //     }
    //     req.user = user;
        next();
    // });
}

// Protected dashboard route
// router.get('/dashboard', authenticateToken, (req, res) => {
//     // Here you can fetch and send user-specific data based on req.user
//     res.status(200).json({ message: 'User Dashboard' });
// });

module.exports = router;