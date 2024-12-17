const express = require('express');
const { getReports } = require('../controllers/admincontroller');
const router = express.Router();

router.get('/reports', getReports);

module.exports = router;
