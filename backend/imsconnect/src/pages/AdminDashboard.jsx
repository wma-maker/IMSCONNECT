import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { fetchAdminReports } from '../utils/api';
import { Container, Grid, Paper, Typography, Button, TextField, Box } from '@mui/material';
import { CheckCircle, Clear, Assignment, AccessTime } from '@mui/icons-material';
import imsImage2 from '../Images/image 6.jpeg';
import imsImage3 from '../Images/image 7.jpeg';
import imsImage4 from '../Images/payroll.jpg';
import imsbackground from '../Images/image 4.jpg';

import { Player } from '@lottiefiles/react-lottie-player'; // Lottie Player
import animationData from '../Images/Animation.json'; // Replace with the path to your animation file

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [timesheets, setTimesheets] = useState([]);
  const [error, setError] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedIdeaId, setSelectedIdeaId] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await fetchAdminReports();
        setReports(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchTimesheets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/timesheets');
        if (!response.ok) throw new Error('Failed to fetch timesheets.');
        const data = await response.json();
        setTimesheets(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReports();
    fetchTimesheets();
  }, []);

  const handleApproval = async (id, approved) => {
    try {
      const response = await fetch(`http://localhost:5000/api/timesheets/${id}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved }),
      });

      if (!response.ok) throw new Error('Failed to update approval status.');

      const updatedTimesheets = timesheets.map((timesheet) =>
        timesheet.id === id ? { ...timesheet, approved } : timesheet
      );
      setTimesheets(updatedTimesheets);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemarkSubmit = async () => {
    if (!remarks) {
      setError('Remark cannot be empty!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/ideas/${selectedIdeaId}/remark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remark: remarks }),
      });

      if (!response.ok) throw new Error('Failed to add remark.');

      const updatedIdeas = reports.map((report) =>
        report.id === selectedIdeaId ? { ...report, remarks: [...report.remarks, { remark: remarks }] } : report
      );
      setReports(updatedIdeas);
      setRemarks('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="dashboard"
      style={{
        backgroundImage: `url(${imsbackground})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Header />
      <div className="dashboard-body">
        <Sidebar />
        <main>
          <Container>
            <Typography
              variant="h3"
              gutterBottom
              align="center"
              sx={{ fontWeight: 'bold', color: 'black', marginBottom: '20px' }}
            >
              Admin Dashboard
            </Typography>

            {error && (
              <Typography color="error" variant="body1" align="center" sx={{ color: '#fff' }}>
                {error}
              </Typography>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                  <Typography variant="h5" gutterBottom>
                    <Assignment sx={{ fontSize: 30 }} /> Reports
                  </Typography>
                  <Box>
                    {reports.map((report) => (
                      <Paper key={report.id} sx={{ padding: 2, marginBottom: 2, boxShadow: 2, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {report.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {report.status}
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: 2 }}>
                  
                        </Typography>
           
                      </Paper>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {/* Submitted Timesheets with Animation */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                  <Typography variant="h5" gutterBottom>
                    <AccessTime sx={{ fontSize: 30 }} /> Submitted Timesheets
                  </Typography>
                  <Box>
                    {timesheets.map((timesheet) => (
                      <Paper key={timesheet.id} sx={{ padding: 2, marginBottom: 2, boxShadow: 2, borderRadius: 2 }}>
                        <Typography variant="h6">
                          <strong>Employee ID:</strong> {timesheet.employeeId}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Hours:</strong> {timesheet.hours}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Submitted At:</strong>{' '}
                          {new Date(timesheet.submittedAt).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Status:</strong> {timesheet.approved ? 'Approved' : 'Pending'}
                        </Typography>

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleApproval(timesheet.id, true)}
                          sx={{ marginTop: 2, marginRight: 1 }}
                        >
                          <CheckCircle sx={{ fontSize: 20 }} /> Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleApproval(timesheet.id, false)}
                          sx={{ marginTop: 2 }}
                        >
                          <Clear sx={{ fontSize: 20 }} /> Disapprove
                        </Button>
                      </Paper>
                    ))}

                    {/* Lottie Animation */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                      <Player autoplay loop src={animationData} style={{ height: '400px', width: '400px' }} />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

{/* Additional Image Section */}
<Grid container spacing={3} sx={{ marginTop: 4 }}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ padding: 3, boxShadow: 2, textAlign: 'center', borderRadius: 2 }}>
                  <img src={imsImage2} alt="imsImage2" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                  <Typography variant="h6" sx={{ marginTop: 2 }}>Voting</Typography>
                  <Typography variant="body2">Hello Manager, here you can view ideas and vote on them.</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper sx={{ padding: 3, boxShadow: 2, textAlign: 'center', borderRadius: 2 }}>
                  <img src={imsImage3} alt="Image 2" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                  <Typography variant="h6" sx={{ marginTop: 2 }}>Collaboration</Typography>
                  <Typography variant="body2">Add critical remarks on certain ideas to help the ones submitting their ideas to aim for improvement.</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper sx={{ padding: 3, boxShadow: 2, textAlign: 'center', borderRadius: 2 }}>
                  <img src={imsImage4} alt="Image 3" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                  <Typography variant="h6" sx={{ marginTop: 2 }}>Reports</Typography>
                  <Typography variant="body2">Checkout the Payrolls for the employees and generate them.</Typography>
                </Paper>
                </Grid>
                </Grid>



          </Container>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
