import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, TextField, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import Lottie from 'react-lottie';
import animationEmpty from '../Images/Animation3.json'; // Replace with your animation file
import { keyframes } from '@emotion/react';

const ReportsPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [remark, setRemark] = useState('');
  const [error, setError] = useState('');
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

  const handleClickIdea = (idea) => {
    setSelectedIdea(idea);
    setRemark(idea.remarks || '');
  };

  const handleSubmitRemark = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/ideas/${selectedIdea.id}/remark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remark }),
      });

      if (!response.ok) throw new Error('Failed to submit remark.');
      const updatedIdea = await response.json();
      setSelectedIdea(updatedIdea);
      setRemark('');
    } catch (err) {
      setError(err.message);
    }
  };

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
        Reports
      </Typography>
      
      {/* Lottie Animation Spot */}
      <Box display="flex" justifyContent="center" marginTop={1}>
        <Lottie options={lottieOptionsEmpty} height={800} width={800} />
      </Box>

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
        <>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            All Ideas
          </Typography>
          
          <Paper elevation={3} sx={{ padding: 2 }}>
            <List>
              {ideas.map((idea) => (
                <ListItem button key={idea.id} onClick={() => handleClickIdea(idea)} sx={{ marginBottom: 2 }}>
                  <ListItemText
                    primary={<Typography variant="h6" color="primary">{idea.title}</Typography>}
                    secondary={<Typography variant="body2">{idea.description}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {selectedIdea && (
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>Remarks for: {selectedIdea.title}</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Add remarks..."
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitRemark}
                sx={{ padding: '10px 20px', fontSize: '16px' }}
              >
                Submit Remark
              </Button>
            </Box>
          )}
        </>
      )}

     

      
    </Container>
  );
};

export default ReportsPage;
