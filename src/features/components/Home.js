import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const enterDraft = () => {
    const roomId = 'room123'; // Replace with dynamic input if needed
    navigate(`/draft/${roomId}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Sports Draft Room
      </Typography>
      <Button variant="contained" color="primary" onClick={enterDraft}>
        Enter Draft Room
      </Button>
    </Container>
  );
};

export default Home;
