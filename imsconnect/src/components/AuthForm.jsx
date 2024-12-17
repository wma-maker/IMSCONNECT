import React from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

const AuthForm = ({ onSubmit, title }) => {
  const [formData, setFormData] = React.useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Grid 
      container 
      direction="column" 
      alignItems="center" 
      justifyContent="center" 
      style={{ height: '100vh' }} 
    >
      <Paper elevation={3} style={{ padding: '2rem', width: '300px' }}>
        <Typography variant="h5" gutterBottom align="center">
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default AuthForm;
