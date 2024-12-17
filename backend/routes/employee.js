const express = require('express');
const { getIdeas, submitTimesheet } = require('../controllers/employeecontroller');
const router = express.Router();

router.get('/ideas', getIdeas);
router.post('/timesheet', submitTimesheet);

module.exports = router;
