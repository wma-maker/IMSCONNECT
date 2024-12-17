const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const authRoutes = require('../routes/auth');
const adminRoutes = require('../routes/admin');
const employeeRoutes = require('../routes/employee');
const ideasRoutes = require('../routes/ides');
const timesheetRoutes =  require('../routes/timesheets');
const payrollRoutes = require('../routes/payroll');

// Create an Express app
const app = express();

// Middleware to add Content Security Policy (CSP) header
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'none'; script-src 'self' https://vercel.live; style-src 'self';");
  next();
});

// Other middleware
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

// API Routes
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

// Test Route (Example)
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Vercel backend!' });
});

module.exports = (req, res) => {
  app(req, res);
};
