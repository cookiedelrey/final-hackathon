import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../../../contexts/MovieContextProvider';

const theme = createTheme();

const AddMovie = () => {
  const { createMovie } = useMovies();

  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: '',
    description: '',
    review: '',
    image: '',
  });

  const handleInp = (e) => {
    let obj = { ...movie, [e.target.name]: e.target.value };
    setMovie(obj);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            ADD NEW MOVIE
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={handleInp}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Movie Title"
              name="name"
              autoComplete="title"
              autoFocus
            />
            <TextField
              onChange={handleInp}
              margin="normal"
              required
              fullWidth
              name="description"
              label="Movie Description"
              type="text"
              id="movie-description"
              autoComplete="movie-description"
            />

            <TextField
              onChange={handleInp}
              margin="normal"
              required
              fullWidth
              name="review"
              label="Movie Review"
              type="text"
              id="movie-review"
              autoComplete="movie-review"
            />
            <TextField
              onChange={handleInp}
              margin="normal"
              required
              fullWidth
              name="image"
              label="Movie Image URL"
              type="text"
              id="movie-image"
              autoComplete="movie-image"
            />

            <TextField
              onChange={handleInp}
              margin="normal"
              required
              fullWidth
              name="video"
              label="Movie URL"
              type="text"
              id="movie-video"
              autoComplete="movie-video"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                  background: 'grey',
                },
              }}
              onClick={() => {
                createMovie(movie);
                navigate('/movies');
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddMovie;
