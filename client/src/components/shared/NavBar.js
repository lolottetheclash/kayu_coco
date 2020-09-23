import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Grid, Toolbar, Typography, useTheme } from '@material-ui/core';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
//TODO: créer un style avec visited pr enlever chgmt couleur sur lien + active
const NavBar = () => {
  const theme = useTheme();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item>
              <WorkRoundedIcon
                fontSize="small"
                display="inline"
                style={{
                  marginRight: 8,
                  color: theme.palette.primary.dark,
                }}
              />
              <Typography display="inline" variant="h5">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  Kayu Coco
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                display="inline"
                variant="h6"
                style={{ marginRight: 15 }}
              >
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  Login
                </Link>
              </Typography>
              <Typography display="inline" variant="h6">
                Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
