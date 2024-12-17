// Mock storage for timesheet
let timesheets = [];


// Controller to submit a new timesheet
const submitTimesheet = (req, res) => {
  const { employeeId, hours } = req.body;

  if (!employeeId || !hours) {
    return res.status(400).json({ message: 'Employee ID and hours are required.' });
  }

  const newTimesheet = {
    id: timesheets.length + 1,
    employeeId,
    hours,
    submittedAt: new Date(),
    approved: false, // Default value for approval status
  };

  timesheets.push(newTimesheet);
  res.status(201).json({ message: 'Timesheet submitted successfully!', timesheet: newTimesheet });
};

// Controller to fetch all timesheets
const getTimesheets = (req, res) => {
  const { employeeId } = req.query; // Retrieve employeeId from query parameter (for filtering)
  console.log('Current Timesheets:', timesheets); 
  if (employeeId) {
    // If employeeId is provided, filter timesheets by employeeId
    const employeeTimesheets = timesheets.filter(timesheet => timesheet.employeeId === employeeId);
    return res.json(employeeTimesheets); // Return only the timesheets for that employee
  }

  // If no employeeId is provided, return all timesheets (for admin)
  res.json(timesheets);
};

// Controller to approve or disapprove a timesheet
const updateTimesheetApproval = (req, res) => {
  const { id } = req.params;
  const { approved } = req.body; // 'approved' field for approval status

  // Find the timesheet by id
  const timesheet = timesheets.find(t => t.id === parseInt(id));

  if (!timesheet) {
    return res.status(404).json({ message: 'Timesheet not found.' });
  }

  // Update the approval status
  timesheet.approved = approved;

  res.json({ message: `Timesheet ${approved ? 'approved' : 'disapproved'} successfully.`, timesheet });
};

module.exports = { getTimesheets, submitTimesheet, updateTimesheetApproval };
