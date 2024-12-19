// api/auth/login.js
//const authMiddleware = require('../middleware/authmiddleware');
//const { login } = require('../controllers/authcontroller');
//const express = require('express');
//const router = express.Route();

//module.exports = (req, res) => {
  //// Apply the authentication middleware first
 //// authMiddleware(req, res, () => {
  //  if (req.method === 'POST') {
   //   return login(req, res);
  //  }

   //  Handle unsupported methods
   //// res.status(405).json({ message: 'Method Not Allowed' });
  //});
////};
//router.post('/login', login);

//module.exports = router;
//adjusted new



// api/auth/login.js
const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const { login } = require('../controllers/authcontroller');

const router = express.Router(); // Use Router instead of Route

// Apply authentication middleware and handle login
router.post('/login', authMiddleware, login);

// Handle unsupported methods for the /login route
router.all('/login', (req, res) => {
  res.status(405).json({ message: 'Method Not Allowed' });
});

module.exports = router;
