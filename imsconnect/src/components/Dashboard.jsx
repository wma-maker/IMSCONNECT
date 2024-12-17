import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Dashboard = ({ title, children }) => {
  return (
    <div className="dashboard">
      <Header />
      <Grid container direction="row" spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
