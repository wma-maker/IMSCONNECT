const { getReports } = require('../controllers/admincontroller');

module.exports = (req, res) => {
  if (req.method === 'GET' && req.url === '/api/admin/reports') {
    return getReports(req, res);
  }

  // Handle unsupported methods or routes
  res.status(404).json({ message: 'Not Found' });
};

