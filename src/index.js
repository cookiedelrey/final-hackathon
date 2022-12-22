import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import FavoritesContextProvider from './contexts/FavoritesContextProvider';
import MovieContextProvider from './contexts/MovieContextProvider';
import AuthContextProvider from './contexts/AuthContextProvider';

import './style/index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <FavoritesContextProvider>
      <MovieContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </MovieContextProvider>
    </FavoritesContextProvider>
  </BrowserRouter>
);
