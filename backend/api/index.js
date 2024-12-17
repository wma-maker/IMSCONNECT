const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

// Import routes from the 'routes' folder
const authRoutes = require('../routes/auth');
const adminRoutes = require('../routes/admin');
const employeeRoutes = require('../routes/employee');
const ideasRoutes = require('../routes/ides');
const timesheetRoutes = require('../routes/timesheets');
const payrollRoutes = require('../routes/payroll');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/timesheets', timesheetRoutes);
app.use('/api/payroll', payrollRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Vercel backend!' });
});

// Export the express app to work with Vercel serverless functions
module.exports = (req, res) => {
  app(req, res);
};
