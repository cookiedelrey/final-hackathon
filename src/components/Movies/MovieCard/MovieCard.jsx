import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFavorites } from '../../../contexts/FavoritesContextProvider';
import { useMovies } from '../../../contexts/MovieContextProvider';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Typography } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MovieCard({ movie }) {
  const { deleteMovie } = useMovies();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  const { addMovieToFavorites, checkMovieInFavs } = useFavorites();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card sx={{ margin: 10 }}>
        <CardMedia
          component="img"
          image={movie.image}
          alt=""
          sx={{ height: '200px' }}
          onClick={() => navigate(`/player/${movie.name}`)}
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {movie.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => addMovieToFavorites(movie)}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={() => deleteMovie(movie.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => navigate(`/movies/${movie.id}`)}>
            <EditIcon />
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Movie Review:</Typography>
            <Typography>{movie.review}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
