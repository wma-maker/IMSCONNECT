import React from 'react';
import { Button, Typography, AppBar, Toolbar } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { logout } = useAuth();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          IMS-Connect
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
