const getReports = (req, res) => {
    const mockReports = [
      { id: 1, title: 'Idea 1 Report', status: 'Approved' },
      { id: 2, title: 'Idea 2 Report', status: 'Pending' }
    ];
  
    res.json(mockReports);
  };
  
  module.exports = { getReports };
  