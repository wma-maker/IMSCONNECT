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

const allowedOrigins = [
  'https://imsconnectfrontend2.vercel.app',
  'https://frontend-flame-nu.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


const corsOptions = {
  origin: 'https://frontend-flame-nu.vercel.app', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.options('*', cors());
app.use(express.json());
app.use(bodyParser.json());

// Define routes
app.use('/auth', authRoutes);
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

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
module.exports = app;
