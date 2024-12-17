import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import Lottie from 'react-lottie';
import animationEmpty from '../Images/Animation4.json'; // Replace with your animation file

const TimesheetsPage = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/timesheets');
        if (!response.ok) throw new Error('Failed to fetch timesheets.');
        const data = await response.json();
        setTimesheets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimesheets();
  }, []);

  // Lottie animation options
  const lottieOptionsEmpty = {
    loop: true,
    autoplay: true,
    animationData: animationEmpty,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
        Submitted Timesheets
      </Typography>

      {error && (
        <Box sx={{ color: 'red', textAlign: 'center', marginBottom: 2 }}>
          <Typography variant="h6">{error}</Typography>
        </Box>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <List>
            {timesheets.length > 0 ? (
              timesheets.map((timesheet) => (
                <ListItem key={timesheet.id}>
                  <Card sx={{ width: '100%', marginBottom: 2 }}>
                    <CardContent>
                      <Typography variant="h6">Employee ID: {timesheet.employeeId}</Typography>
                      <Typography variant="body1">Hours: {timesheet.hours}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Submitted At: {new Date(timesheet.submittedAt).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                No timesheets submitted yet.
              </Typography>
            )}
          </List>
        </Paper>
      )}

      {/* Lottie Animation Spot */}
      <Box display="flex" justifyContent="center" marginTop={4}>
        <Lottie options={lottieOptionsEmpty} height={400} width={400} />
      </Box>
    </Container>
  );
};

export default TimesheetsPage;
