const getIdeas = (req, res) => {
    const mockIdeas = [
      { id: 1, title: 'Sustainability Project', status: 'Under Review' },
      { id: 2, title: 'AI-Powered Green Tech', status: 'Approved' }
    ];
  
    res.json(mockIdeas);
  };
  
  const submitTimesheet = (req, res) => {
    const { employeeId, hours } = req.body;
  
    // Simulate saving timesheet data
    res.json({ message: `Timesheet submitted for employee ${employeeId} with ${hours} hours.` });
  };
  
  module.exports = { getIdeas, submitTimesheet };
  