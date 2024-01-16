const express = require('express');
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('views'));

// Use the registration route
app.use(userRoutes);

app.use(mealRoutes)

// route for /register
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html');
});
//route for /login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

// Since i have a problem with my authentication, because my req.header appear undefined i do it without authentication, you can check mealRoutes.js
app.get('/dashboard', (req, res) => {
  // Here you can fetch and send user-specific data based on req.user
  res.sendFile(__dirname + '/views/dashboard.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});