import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMovies } from '../../../contexts/MovieContextProvider';

const theme = createTheme();

const EditMovie = () => {
  const { getOneMovieDetails, movieDetails, updateMovie } = useMovies();
  const { id } = useParams();
  const [editedMovie, setEditedMovie] = useState(movieDetails);

  useEffect(() => {
    getOneMovieDetails(id);
  }, []);

  useEffect(() => {
    setEditedMovie(movieDetails);
  }, [movieDetails]);

  const navigate = useNavigate();

  const handleInp = (e) => {
    let obj = { ...editedMovie, [e.target.name]: e.target.value };
    setEditedMovie(obj);
  };

  return (
    <>
      {editedMovie && (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs" margin={15}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                EDIT
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  onChange={handleInp}
                  value={editedMovie.name || ''}
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
                  value={editedMovie.description || ''}
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
                  value={editedMovie.review || ''}
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
                  value={editedMovie.image || ''}
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
                  value={editedMovie.video || ''}
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
                  onClick={() => {
                    updateMovie(id, editedMovie);
                    navigate('/movies');
                  }}
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
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default EditMovie;
