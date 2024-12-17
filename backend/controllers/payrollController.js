// Mock storage for timesheets and employees
const timesheets = [
    { id: 1, employeeId: 'E001', hours: 40, submittedAt: new Date() },
    { id: 2, employeeId: 'E002', hours: 35, submittedAt: new Date() },
  ];
  
  const employees = [
    { id: 'E001', name: 'John Doe', payRate: 20 },
    { id: 'E002', name: 'Jane Smith', payRate: 22 },
  ];
  
  // Controller to generate payroll
  const generatePayroll = (req, res) => {
    // Combine timesheet and employee data to calculate payroll
    const payroll = timesheets.map((timesheet) => {
      const employee = employees.find((emp) => emp.id === timesheet.employeeId);
      if (employee) {
        const totalPayment = timesheet.hours * employee.payRate;
        return {
          employeeId: employee.id,
          name: employee.name,
          hours: timesheet.hours,
          payRate: employee.payRate,
          totalPayment,
        };
      }
      return null;
    }).filter(Boolean); // Remove null values if employee is not found
  
    res.status(200).json({ payroll });
  };
  
  module.exports = { generatePayroll };
  