// api/auth/login.js
//const authMiddleware = require('../middleware/authmiddleware');
const { login } = require('../controllers/authcontroller');
const express = require('express');
const router = express.Route();

//module.exports = (req, res) => {
  // Apply the authentication middleware first
//  authMiddleware(req, res, () => {
   // if (req.method === 'POST') {
   //   return login(req, res);
   // }

    // Handle unsupported methods
   // res.status(405).json({ message: 'Method Not Allowed' });
  //});
//};
router.post('/login', login);

module.exports = router;
//adjusted new

