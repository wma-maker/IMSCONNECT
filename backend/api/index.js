const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./auth'); // Updated path
const adminRoutes = require('./admin'); // Updated path
const employeeRoutes = require('./employee'); // Updated path
const ideasRoutes = require('./ides'); // Updated path
const timesheetRoutes = require('./timesheets'); // Updated path
const payrollRoutes = require('./payroll'); // Updated path

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/timesheets', timesheetRoutes);
app.use('/api/payroll', payrollRoutes);

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running successfully on Vercel!' });
});

// Export the app for Vercel
module.exports = app;
