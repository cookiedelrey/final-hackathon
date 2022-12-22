import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useMovies } from '../../../contexts/MovieContextProvider';
import MovieCard from '../MovieCard/MovieCard';

const MovieList = () => {
  const { movies, getMovies, term, filteredData } = useMovies();
  console.log(movies);

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        marginRight: '30px',
      }}
    >
      {filteredData.length
        ? filteredData.map((movie) => (
            <Box key={movie.id} sx={{ gridColumn: '1fr' }}>
              <MovieCard movie={movie} />
            </Box>
          ))
        : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </Box>
  );
};

export default MovieList;
