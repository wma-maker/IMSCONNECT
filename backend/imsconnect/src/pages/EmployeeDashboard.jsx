import React, { useEffect, useState } from 'react';
import { fetchEmployeeIdeas, submitTimesheet } from '../utils/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Container, Typography, Box, Button, TextField, Snackbar, Alert, Paper, Grid, Card, CardContent, TextareaAutosize } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import img1 from '../Images/image 4.jpg'
import img2 from '../Images/image 8.png'
import img3 from '../Images/image 9.webp'

const EmployeeDashboard = () => {
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [timesheet, setTimesheet] = useState({ employeeId: '', hours: '' });
  const [newIdea, setNewIdea] = useState({ title: '', description: '' });
  const [newRemarks, setNewRemarks] = useState({}); 
  const [selectedIdeaId, setSelectedIdeaId] = useState(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ideas');
        if (!response.ok) throw new Error('Failed to fetch ideas.');
        const data = await response.json();
        setIdeas(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchIdeas();
  }, []);

  const handleTimesheetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitTimesheet(timesheet);
      setMessage('Timesheet submitted successfully!');
      setTimesheet({ employeeId: '', hours: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIdea),
      });
      if (!response.ok) throw new Error('Failed to submit idea.');

      const data = await response.json();
      setMessage('Idea submitted successfully!');
      setNewIdea({ title: '', description: '' });

      // Refresh ideas list
      const refreshedIdeasResponse = await fetch('http://localhost:5000/api/ideas');
      if (!refreshedIdeasResponse.ok) throw new Error('Failed to refresh ideas.');
      const refreshedIdeas = await refreshedIdeasResponse.json();
      setIdeas(refreshedIdeas);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVote = async (ideaId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/ideas/${ideaId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to vote.');
      setMessage('Vote submitted successfully!');
      const updatedIdeas = ideas.map((idea) =>
        idea.id === ideaId ? { ...idea, votes: idea.votes + 1 } : idea
      );
      setIdeas(updatedIdeas);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemarkSubmit = async () => {
    if (!newRemarks[selectedIdeaId]) {
      setError('Remark cannot be empty!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/ideas/${selectedIdeaId}/remark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remark: newRemarks[selectedIdeaId] }),
      });
      if (!response.ok) throw new Error('Failed to add remark.');

      const updatedIdeas = ideas.map((idea) =>
        idea.id === selectedIdeaId
          ? { ...idea, remarks: [...idea.remarks, { remark: newRemarks[selectedIdeaId] }] }
          : idea
      );
      setIdeas(updatedIdeas);
      setNewRemarks({ ...newRemarks, [selectedIdeaId]: '' });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemarkChange = (e, ideaId) => {
    setNewRemarks({ ...newRemarks, [ideaId]: e.target.value });
    setSelectedIdeaId(ideaId);
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-body">
        <Sidebar />
        <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            Employee Dashboard
          </Typography>

          {error && (
            <Snackbar open={true} autoHideDuration={6000}>
              <Alert severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            </Snackbar>
          )}

          {message && (
            <Snackbar open={true} autoHideDuration={6000}>
              <Alert severity="success" sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
          )}

          <Box mb={4}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Submit Timesheet
            </Typography>
            <form onSubmit={handleTimesheetSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Employee ID"
                    value={timesheet.employeeId}
                    onChange={(e) => setTimesheet({ ...timesheet, employeeId: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Hours Worked"
                    value={timesheet.hours}
                    onChange={(e) => setTimesheet({ ...timesheet, hours: e.target.value })}
                    required
                  />
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Submit Timesheet
              </Button>
            </form>
          </Box>

          <Box mb={4}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Submit New Idea
            </Typography>
            <form onSubmit={handleIdeaSubmit}>
              <TextField
                fullWidth
                label="Idea Title"
                value={newIdea.title}
                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                required
                sx={{ mb: 2 }}
              />
              <TextareaAutosize
                minRows={4}
                placeholder="Idea Description"
                value={newIdea.description}
                onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Submit Idea
              </Button>
            </form>
          </Box>

          {/* New Images Section */}
          <Box mb={4}>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ height: '200px', backgroundColor: '#f5f5f5' }}>
                  <img
                    src={img1}
                    alt="Placeholder 1"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ height: '200px', backgroundColor: '#f5f5f5' }}>
                  <img
                    src={img2}
                    alt="Placeholder 2"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ height: '200px', backgroundColor: '#f5f5f5' }}>
                  <img
                    src={img3}
                    alt="Placeholder 3"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              View and Vote on Others' Ideas
            </Typography>
            {ideas.map((idea) => (
              <Card key={idea.id} sx={{ mb: 4, boxShadow: 3, padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">{idea.title}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {idea.description}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Votes: {idea.votes}
                  </Typography>
                  <Button variant="outlined" color="primary" onClick={() => handleVote(idea.id)}>
                    Vote
                  </Button>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Remarks
                    </Typography>
                    <ul>
                      {idea.remarks && idea.remarks.length > 0 ? (
                        idea.remarks.map((remark, index) => (
                          <li key={index}>
                            <Typography variant="body2" color="textSecondary">
                              <strong>{remark.submittedAt}: </strong>{remark.remark}
                            </Typography>
                          </li>
                        ))
                      ) : (
                        <Typography variant="body2" color="textSecondary">No remarks yet.</Typography>
                      )}
                    </ul>
                    <TextareaAutosize
                      minRows={3}
                      value={newRemarks[idea.id] || ''}
                      onChange={(e) => handleRemarkChange(e, idea.id)}
                      placeholder="Add a remark"
                      style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => { setSelectedIdeaId(idea.id); handleRemarkSubmit(); }}>
                      Add Remark
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
