 // Replace with your backend URL if deployed
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
// Login API
export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Failed to login. Check credentials.');
  }
  return await response.json();
};

// Fetch reports for admin
export const fetchAdminReports = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/reports`);
  if (!response.ok) {
    throw new Error('Failed to fetch admin reports.');
  }
  return await response.json();
};

// Fetch ideas for employees
export const fetchEmployeeIdeas = async () => {
  const response = await fetch(`${API_BASE_URL}/employee/ideas`);
  if (!response.ok) {
    throw new Error('Failed to fetch employee ideas.');
  }
  return await response.json();
};

// Submit timesheet for employees
export const submitTimesheet = async (timesheet) => {
  const response = await fetch(`${API_BASE_URL}/employee/timesheet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(timesheet),
  });
  if (!response.ok) {
    throw new Error('Failed to submit timesheet.');
  }
  return await response.json();
};
