import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../../contexts/MovieContextProvider';
import { useAuth } from '../../contexts/AuthContextProvider';
import { ADMIN } from '../consts';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('xs')]: {
    marginLeft: theme.spacing(8),
    width: '150px',
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(36),
    width: '200px',
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(54),
    width: '500px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const [anchorElTool, setAnchorElTool] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { searchMovie } = useMovies();

  const {
    user: { email },
    handleLogout,
  } = useAuth();
  console.log(email);

  const isMenuOpen = Boolean(anchorElTool);
  const isProfileMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuOpen = (event) => {
    setAnchorElTool(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorElTool(null);
    handleMobileMenuClose();
  };

  const navigate = useNavigate();

  const toolMenuId = 'dark-search-account-menu-tool';
  const renderToolMenu = (
    <Menu
      anchorEl={anchorElTool}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={toolMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '10vh',
          justifyContent: 'space-around',
        }}
      >
        {email === ADMIN ? (
          <MenuItem
            onClick={() => navigate('/add')}
            sx={{ textAlign: 'center' }}
            color="inherit"
          >
            Admin Tools
          </MenuItem>
        ) : null}

        <MenuItem
          onClick={() => navigate('/movies')}
          sx={{ textAlign: 'center' }}
          color="inherit"
        >
          Movies
        </MenuItem>
      </MenuItem>
    </Menu>
  );

  const menuId = 'dark-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {email ? (
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ textAlign: 'center' }}>Sign Out</Typography>
        </MenuItem>
      ) : (
        <div>
          <MenuItem onClick={() => navigate('/register')}>
            <Typography sx={{ textAlign: 'center' }}>Sign Up</Typography>
          </MenuItem>
          <MenuItem onClick={() => navigate('/login')}>
            <Typography sx={{ textAlign: 'center' }}>Sign In</Typography>
          </MenuItem>
        </div>
      )}
      <MenuItem onClick={() => navigate('/favorites')}>
        Favorite Movies
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'dark-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuOpen} onClose={handleMobileMenuClose}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="light-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => navigate('/login')}
        >
          <AccountCircle />
        </IconButton>
        {email ? (
          <MenuItem onClick={handleLogout}>
            <Typography sx={{ textAlign: 'center' }}>Sign Out</Typography>
          </MenuItem>
        ) : (
          <div>
            <MenuItem onClick={() => navigate('/register')}>
              <Typography sx={{ textAlign: 'center' }}>Sign Up</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/login')}>
              <Typography sx={{ textAlign: 'center' }}>Sign In</Typography>
            </MenuItem>
          </div>
        )}
        <MenuItem onClick={() => navigate('/favorites')}>
          Favorite Movies
        </MenuItem>
      </MenuItem>
    </Menu>
  );

  return (
    <Box className="box" sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ backgroundColor: 'black' }}
        className="nav"
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-haspopup="true"
            aria-controls={toolMenuId}
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            sx={{ ml: '6%', mt: '5px' }}
            onClick={() => navigate('/')}
          >
            <MovieFilterIcon size="large" sx={{ color: 'white' }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'white',
              fontWeight: 700,
              mt: 1,
            }}
          >
            MY MOVIE
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => searchMovie(e.target.value)}
              // value={term}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderToolMenu}
    </Box>
  );
}
