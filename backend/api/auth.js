// api/auth/login.js

// Import necessary modules
const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const { login } = require('../controllers/authcontroller');

// Initialize the router
const router = express.Router(); // Corrected from Route to Router

// Handle the login route with authentication middleware
router.post('/login', authMiddleware, login);

// Apply the authentication middleware first
module.exports = (req, res) => {
  authMiddleware(req, res, () => {
    if (req.method === 'POST') {
      // Call the login function for POST requests
      return login(req, res);
    }

    // Handle unsupported methods
    res.status(405).json({ message: 'Method Not Allowed' });
  });
};

// Handle unsupported methods for the /login route
router.all('/login', (req, res) => {
  res.status(405).json({ message: 'Method Not Allowed' });
});

// Export the router
module.exports = router;
