const express = require('express');
const { getTimesheets, submitTimesheet, updateTimesheetApproval } = require('../controllers/timesheetcontroller');
const router = express.Router();

// Route to fetch all timesheets
router.get('/', getTimesheets);

// Route to submit a new timesheet
router.post('/', submitTimesheet);

router.patch('/:id/approve', updateTimesheetApproval);

module.exports = router;
