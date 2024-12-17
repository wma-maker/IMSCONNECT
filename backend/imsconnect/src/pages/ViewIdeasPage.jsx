import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, Box, Card, CardContent, Button, Grid, Snackbar, Alert } from '@mui/material';
import Lottie from 'react-lottie';
import animationLoading from '../Images/Animation5.json'; // Lottie animation for loading

const ViewIdeasPage = () => {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ideas');
        if (!response.ok) throw new Error('Failed to fetch ideas.');
        const data = await response.json();
        setIdeas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

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

  // Lottie animation options for loading
  const lottieOptionsLoading = {
    loop: true,
    autoplay: true,
    animationData: animationLoading,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, position: 'relative' }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
        View Ideas from Others
      </Typography>

      {/* Always Present Animation (Fixed in Background) */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100vh" // Full height of the viewport
        zIndex={-1} // Send it to the background
        sx={{
          pointerEvents: 'none',
        }}
      >
        {/* Lottie background animation */}
        <Lottie options={lottieOptionsLoading} height="100%" width="100%" />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <Lottie options={lottieOptionsLoading} height={150} width={150} />
        </Box>
      ) : (
        <>
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

          {/* Display Ideas Side by Side */}
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {ideas.map((idea) => (
              <Grid item xs={12} sm={6} md={4} key={idea.id}>
                <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2, transition: 'transform 0.3s ease' }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: 2 }}>
                      {idea.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
                      {idea.description}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" sx={{ marginBottom: 3 }}>
                      <strong>Votes:</strong> {idea.votes}
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleVote(idea.id)}
                      sx={{
                        '&:hover': { backgroundColor: '#1976d2', transform: 'scale(1.1)' },
                        transition: 'transform 0.3s ease, background-color 0.3s ease',
                        padding: '12px 0',
                      }}
                    >
                      Vote
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ViewIdeasPage;
