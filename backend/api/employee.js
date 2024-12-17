const { getIdeas, submitTimesheet } = require('../controllers/employeecontroller');

module.exports = (req, res) => {
  if (req.method === 'GET' && req.url === '/api/employee/ideas') {
    return getIdeas(req, res);
  } 
  if (req.method === 'POST' && req.url === '/api/employee/timesheet') {
    return submitTimesheet(req, res);
  }

  // Handle unsupported methods or routes
  res.status(404).json({ message: 'Not Found' });
};
