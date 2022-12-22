import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
      <Grid
        container
        sx={{
          display: 'flex',
          padding: 7,
          justifyContent: 'space-between',
          fontSize: '12px',
          borderBlockEnd: '1px solid',
          borderBlockEndColor: 'light-grey',
        }}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: '5%',
            mr: '5%',
          }}
        >
          <Link className="link">
            <Typography>FAQ</Typography>
          </Link>
          <Link className="link">
            <Typography>Help Center</Typography>
          </Link>
          <Link className="link">
            <Typography>Contact Us</Typography>
          </Link>
        </Grid>
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: '5%',
            mr: '5%',
          }}
        >
          <Link className="link">
            <Typography>Corporate Information</Typography>
          </Link>
          <Link className="link">
            <Typography>Media Center</Typography>
          </Link>
          <Link className="link">
            <Typography>Legal Notices</Typography>
          </Link>
        </Grid>
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: '5%',
            mr: '5%',
          }}
        >
          <Link className="link">
            <Typography>Terms of Use</Typography>
          </Link>
          <a href="https://fast.com/" target="_blank" className="link">
            <Typography>Speed Test</Typography>
          </a>
          <Link className="link">
            <Typography>Ways to Watch</Typography>
          </Link>
        </Grid>
      </Grid>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '10px',
          color: 'grey',
          pt: 3,
          pb: 3,
        }}
      >
        {''}© 2022 My Movie All Rights Reserved.
      </Typography>
    </div>
  );
};

export default Footer;
