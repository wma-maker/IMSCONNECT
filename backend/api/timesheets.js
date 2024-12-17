const { getTimesheets, submitTimesheet, updateTimesheetApproval } = require('../controllers/timesheetcontroller');

module.exports = (req, res) => {
  if (req.method === 'GET' && req.url === '/api/timesheets') {
    return getTimesheets(req, res);
  }

  if (req.method === 'POST' && req.url === '/api/timesheets') {
    return submitTimesheet(req, res);
  }

  if (req.method === 'PATCH' && req.url.match(/^\/api\/timesheets\/\d+\/approve$/)) {
    return updateTimesheetApproval(req, res);
  }

  // Handle unsupported methods or routes
  res.status(404).json({ message: 'Not Found' });
};
