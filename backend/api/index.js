const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const employeeRoutes = require('./employee');
const ideasRoutes = require('./ides');
const timesheetRoutes = require('./timesheets');
const payrollRoutes = require('./payroll');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/timesheets', timesheetRoutes);
app.use('/api/payroll', payrollRoutes);

// Root route to test deployment
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

module.exports = app;
