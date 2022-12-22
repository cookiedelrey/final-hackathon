import React, { createContext, useContext, useReducer } from 'react';
import { FAVORITES } from '../components/consts';
import { getCountMoviesInFavs } from '../components/funcs';

const favoritesContext = createContext();

export const useFavorites = () => {
  return useContext(favoritesContext);
};

const INIT_STATE = {
  favorites: JSON.parse(localStorage.getItem('favorites')),
  favoritesLength: getCountMoviesInFavs(),
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case FAVORITES.GET_FAVORITES:
      return { ...state, favorites: action.payload };
    case FAVORITES.GET_FAVORITES_LENGHT:
      return { ...state, favoritesLength: action.payload };
    default:
      return state;
  }
}

const FavoritesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
      localStorage.setItem('favorites', JSON.stringify({ favorites: [] }));

      favorites = { favorites: [] };
    }

    dispatch({
      type: FAVORITES.GET_FAVORITES,
      payload: favorites,
    });
  };

  const addMovieToFavorites = (movie) => {
    console.log(movie);
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    if (!favorites) {
      favorites = {
        movies: [],
      };
    }
    favorites.movies.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    dispatch({
      type: FAVORITES.GET_FAVORITES,
      payload: favorites,
    });
  };

  function deleteMovieFromFavs(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    favorites.movies = favorites.movies.filter((elem) => elem.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    getFavorites();

    dispatch({
      type: FAVORITES.GET_FAVORITES_LENGHT,
      payload: favorites,
    });
  }

  function checkMovieInFavs(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
      let newFavs = favorites.movies.filter((elem) => elem.id == id);
      return newFavs.length > 0 ? true : false;
    } else {
      favorites = {
        movies: [],
      };
    }
  }

  const values = {
    getFavorites,
    checkMovieInFavs,
    addMovieToFavorites,
    favorites: state.favorites,
    deleteMovieFromFavs,
  };

  return (
    <favoritesContext.Provider value={values}>
      {children}
    </favoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
