const { login } = require('../controllers/authcontroller');

module.exports = (req, res) => {
  if (req.method === 'POST' && req.url === '/api/auth/login') {
    return login(req, res);
  }

  // Handle unsupported methods or routes
  res.status(404).json({ message: 'Not Found' });
};

