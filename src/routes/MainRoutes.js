import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';
import HomePage from '../pages/HomePage/HomePage';
import MovieListPage from '../pages/MovieListPage/MovieListPage';
import MoviePlayerPage from '../pages/MoviePlayerPage/MoviePlayerPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import EditPage from '../pages/EditPage/EditPage';
import AddMoviePage from '../pages/AddMoviePage/AddMoviePage';
import { ADMIN } from '../components/consts';

const MainRoutes = () => {
  const { user } = useAuth();
  const PUBLIC_ROUTES = [
    { link: '/', element: <HomePage />, id: 1 },
    { link: '/login', element: <SignInPage />, id: 2 },
    { link: '/register', element: <SignUpPage />, id: 3 },
    { link: '/movies', element: <MovieListPage />, id: 4 },
    { link: '/favorites', element: <FavoritesPage />, id: 6 },
    { link: '/player/:name', element: <MoviePlayerPage />, id: 7 },
    { link: '*', element: <NotFoundPage />, id: 8 },
    { link: '/add', element: <AddMoviePage />, id: 5 },
    { link: '/movies/:id', element: <EditPage />, id: 9 },
  ];
  const PRIVATE_ROUTES = [
    { link: '/add', element: <AddMoviePage />, id: 5 },
    { link: '/edit', element: <EditPage />, id: 9 },
  ];

  console.log(user, 'routes');
  return (
    <>
      <Routes>
        {PUBLIC_ROUTES.map((item) => (
          <Route path={item.link} element={item.element} key={item.id} />
        ))}

        {user
          ? PRIVATE_ROUTES.map((item) => (
              <Route
                key={item.id}
                path={item.link}
                element={
                  user.email === ADMIN ? (
                    item.element
                  ) : (
                    <Navigate replace to="*" />
                  )
                }
              />
            ))
          : null}
      </Routes>
    </>
  );
};

export default MainRoutes;
