import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../fire';

const movieContext = createContext();
export const useMovies = () => useContext(movieContext);

const INIT_STATE = {
  movies: [],
  movieDetails: {},
  filteredData: [],
  term: '',
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case 'GET_MOVIES':
      return { ...state, movies: action.payload };

    case 'GET_MOVIE_DETAILS':
      return { ...state, movieDetails: action.payload };

    case 'SEARCH_MOVIE':
      return { ...state, filteredData: action.payload };
    case 'SEARCH_TERM':
      return { ...state, term: action.payload };

    default:
      return state;
  }
}

const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //ф-ия для получ-я ссылки на коллекцию данных
  const moviesCollectionRef = collection(db, 'movies');

  //read
  async function getMovies() {
    const data = await getDocs(moviesCollectionRef);
    dispatch({
      type: 'GET_MOVIES',
      payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    });
  }

  // create

  async function createMovie(newMovie) {
    await addDoc(moviesCollectionRef, newMovie);
  }
  function searchMovie(str) {
    // console.log(state.movies, str);
    if (str) {
      const filteredData = state.movies.filter((item) =>
        item.name.toLowerCase().includes(str.toLowerCase())
      );
      dispatch({
        type: 'SEARCH_MOVIE',
        payload: filteredData,
      });
      dispatch({
        type: 'SEARCH_TERM',
        payload: str,
      });
    } else {
      dispatch({
        type: 'SEARCH_MOVIE',
        payload: state.movies,
      });
    }
  }

  // update

  async function getOneMovieDetails(id) {
    const movieDocRef = doc(db, 'movies', id);

    const movieDetails = await getDoc(movieDocRef);
    dispatch({
      type: 'GET_MOVIE_DETAILS',
      payload: movieDetails.data(),
    });
  }

  async function updateMovie(id, updatedMovie) {
    const movieDocRef = doc(db, 'movies', id);

    await updateDoc(movieDocRef, updatedMovie);
    getMovies();
  }

  async function deleteMovie(id) {
    const movieDocRef = doc(db, 'movies', id);
    await deleteDoc(movieDocRef);
    getMovies();
  }

  const values = {
    deleteMovie,
    updateDoc,
    updateMovie,
    movieDetails: state.movieDetails,
    getOneMovieDetails,
    createMovie,
    searchMovie,
    filteredData: state.filteredData,
    term: state.term,
    getMovies,
    movies: state.movies,
  };
  return (
    <movieContext.Provider value={values}>{children}</movieContext.Provider>
  );
};

export default MovieContextProvider;
