import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { useMovies } from '../../../contexts/MovieContextProvider';

const Movie = () => {
  const params = useParams();
  const { movies, getMovies } = useMovies();
  const [url, setUrl] = useState('');

  useEffect(() => {
    let flag = false;
    const initMovies = async () => {
      await getMovies();
    };
    if (!flag) {
      initMovies();
    }
    return () => {
      flag = true;
    };
  }, []);
  //   console.log(movies, params);

  const currentMovie = useMemo(() => {
    // console.log('works', movies);
    if (movies.length > 0) {
      return movies.filter((movie) => movie.name === params.name)[0].video;
    }
  }, [movies]);
  //   console.log(url, 'url');
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
      <ReactPlayer url={currentMovie} controls={true} />
    </div>
  );
};

export default Movie;
