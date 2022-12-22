import { Button, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Paper
        sx={{
          height: 600,
          backgroundImage: `url(https://rare-gallery.com/uploads/posts/301395-Avatar-2-Movie-Art-Island-Scenery-4K.jpg)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: 35,
          }}
        >
          <Typography
            sx={{ justifyContent: 'center' }}
            variant="h4"
            color="white"
          >
            Unlimited movies for all.
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate('/movies')}
          >
            GET STARTED!
          </Button>
        </Container>
      </Paper>
    </div>
  );
};

export default Home;
