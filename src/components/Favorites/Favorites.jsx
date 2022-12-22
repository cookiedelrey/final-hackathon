import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFavorites } from '../../contexts/FavoritesContextProvider';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';

export default function Favorites() {
  const { getFavorites, favorites, deleteMovieFromFavs } = useFavorites();

  React.useEffect(() => {
    getFavorites();
  }, []);
  const cleaner = () => {
    localStorage.removeItem('favorites');
    getFavorites();
  };
  if (!favorites || !favorites.movies) {
    return;
  }
  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
        },
        margin: 5,
      }}
    >
      {favorites.movies.map((row, i) => (
        <Card
          key={i}
          sx={{
            flexDirection: 'column',
            width: { xs: '65%', sm: '46%', md: '59%' },
            margin: '0 auto',
            // margin: 5,
          }}
        >
          <CardMedia
            component={'img'}
            sx={{
              flexDirection: 'column',
            }}
            src={row.image}
          >
            {/* <img src={row.image} alt="" style={{ height: '200px' }} /> */}
          </CardMedia>
          <CardContent
            sx={{
              margin: 0,
              padding: 2,
              justifyContent: 'flex-start',
              flexDirection: 'column',
              display: 'grid',
            }}
          >
            <Typography variant="body1" color="text.primary">
              {row.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {row.description}
            </Typography>
          </CardContent>
          <IconButton
            sx={{ justifyContent: 'flex-start' }}
            onClick={() => {
              deleteMovieFromFavs(row.id);
            }}
          >
            <ClearIcon />
          </IconButton>
        </Card>
      ))}
    </Box>
  );
}
