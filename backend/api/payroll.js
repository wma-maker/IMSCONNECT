const { generatePayroll } = require('../controllers/payrollController');

module.exports = (req, res) => {
  if (req.method === 'GET' && req.url === '/api/payroll/generate') {
    return generatePayroll(req, res);
  }

  // Handle unsupported methods or routes
  res.status(404).json({ message: 'Not Found' });
};
