export function getCountMoviesInFavs() {
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  return favorites && favorites.movies ? favorites.movies.length : 0;
}
