import { Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 200,
      }}
    >
      <Typography>404 ERROR</Typography>
      <Typography>Page Not Found </Typography>
    </div>
  );
};

export default NotFound;
