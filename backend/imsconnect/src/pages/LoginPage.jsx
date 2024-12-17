import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Grid, Typography, TextField, Button, Paper, Box, Container } from '@mui/material';
import Header from '../components/Header';  // Import Header component
import { keyframes } from '@mui/system';
import imsImage from '../Images/Image 1.webp'; // Import the image

// Define animation keyframes for a smooth slide-in effect
const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(credentials);
      setUser(user);
      navigate(user.role === 'manager' ? '/admin' : '/employee');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      
      {/* Overlay Text for IMS Connect */}
      <Typography 
        variant="h3" 
        sx={{
          position: 'absolute', 
          top: '10%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          color: 'black', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
          fontSize: { xs: '2rem', md: '3rem' },
          zIndex: 10,
        }}
      >
        Welcome to IMS-Connect
      </Typography>

      <Header />

      <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', zIndex: 5 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {/* Image Section */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src={imsImage} 
              alt="IMS Connect Illustration" 
              style={{ 
                width: '100%', // Makes the image responsive
                maxHeight: '400px', // Optional: to prevent excessive height on large screens
                objectFit: 'cover', 
                borderRadius: '10px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
              }} 
            />
          </Grid>
          
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRadius: 4,
              boxShadow: 3,
              animation: `${slideIn} 1s ease-in-out`,
              zIndex: 5, 
              background: '#CBE3EF', 
            }}>
              <Typography variant="h4" gutterBottom align="center">
                Log In
              </Typography>
              <Typography variant="body1" paragraph align="center">
                Enter your credentials to access your IMS-Connect dashboard. Get started today and manage your ideas efficiently.
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  sx={{ transition: 'all 0.3s', '&:hover': { borderColor: '#1976d2' } }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  sx={{ transition: 'all 0.3s', '&:hover': { borderColor: '#1976d2' } }}
                />
                {error && <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>{error}</Typography>}
                <Button
                  variant="contained"
                  color="#3A4163"
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 3,
                    '&:hover': {
                      backgroundColor: '#EDF3FB',
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  Login
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Body Section with 5 squares */}
      <Container sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Explore the Features of IMS-Connect
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          {/* Square 1: Vote */}
          <Grid item xs={12} sm={4} md={2}>
            <Box
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: '#5AA8D6',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 3,
                position: 'relative',
                cursor: 'pointer',
                '&:hover .desc': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                Vote
              </Typography>
              <Box
                className="desc"
                sx={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '5px',
                  borderRadius: '5px',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'all 0.3s ease',
                }}
              >
                Vote for your favorite ideas and make an impact!
              </Box>
            </Box>
          </Grid>

          {/* Square 2: Collaborate */}
          <Grid item xs={12} sm={4} md={2}>
            <Box
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: '#5AA8D6',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 3,
                position: 'relative',
                cursor: 'pointer',
                '&:hover .desc': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                Collaborate
              </Typography>
              <Box
                className="desc"
                sx={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '5px',
                  borderRadius: '5px',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'all 0.3s ease',
                }}
              >
                Collaborate with your team for innovative solutions.
              </Box>
            </Box>
          </Grid>

          {/* Square 3: Payrolls */}
          <Grid item xs={12} sm={4} md={2}>
            <Box
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: '#5AA8D6',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 3,
                position: 'relative',
                cursor: 'pointer',
                '&:hover .desc': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                Payrolls
              </Typography>
              <Box
                className="desc"
                sx={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '5px',
                  borderRadius: '5px',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'all 0.3s ease',
                }}
              >
                Manage payrolls and track employee compensation.
              </Box>
            </Box>
          </Grid>

          {/* Square 4: Reports */}
          <Grid item xs={12} sm={4} md={2}>
            <Box
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: '#5AA8D6',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 3,
                position: 'relative',
                cursor: 'pointer',
                '&:hover .desc': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                Reports
              </Typography>
              <Box
                className="desc"
                sx={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '5px',
                  borderRadius: '5px',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'all 0.3s ease',
                }}
              >
                Generate reports to track the progress of your projects.
              </Box>
            </Box>
          </Grid>

          {/* Square 5: Timesheets */}
          <Grid item xs={12} sm={4} md={2}>
            <Box
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: '#5AA8D6',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 3,
                position: 'relative',
                cursor: 'pointer',
                '&:hover .desc': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                Timesheets
              </Typography>
              <Box
                className="desc"
                sx={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '5px',
                  borderRadius: '5px',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'all 0.3s ease',
                }}
              >
                Track and manage employee working hours efficiently.
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginPage;
