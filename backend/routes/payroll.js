const express = require('express');
const { generatePayroll } = require('../controllers/payrollController');
const router = express.Router();

// Route to generate payrolls
router.get('/generate', generatePayroll);

module.exports = router;
