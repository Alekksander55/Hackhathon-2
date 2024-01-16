const passport = require('passport');
const User = require('../models/user');

class UserController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;

      // Check if the username is already taken
      const existingUser = await User.findUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken.' });
      }

      // Create a new user
      const newUser = await User.createUser(username, password);

      // Log in the new user
      req.login(newUser, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error logging in after registration.' });
        }
        return res.json({ user: newUser, message: 'Registration successful.' });
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error during registration.' });
    }
  }

  static login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ message: 'Incorrect username or password.' });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({ user, message: 'Login successful.' });
      });
    })(req, res, next);
  }

  static logout(req, res) {
    req.logout();
    res.json({ message: 'Logout successful.' });
  }

  static async getUserProfile(req, res) {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      res.json({ user: req.user, message: 'User profile fetched successfully.' });
    } else {
      res.status(401).json({ message: 'User not authenticated.' });
    }
  }
}

module.exports = UserController;