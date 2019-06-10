import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const AppHeader = ({ classes }) => {
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.toolbarContent}>
          <Typography variant="h6" className={classes.title}>
            Remake
          </Typography>

          <Button
            component={RouterLink}
            to={'/user/create'}
          >
            <GroupIcon
              className={classes.appBarButtonIcon}
            />
            <Typography className={classes.appBarButtonTitle}>
              Add new user
            </Typography>
          </Button>
          <Button
            component={RouterLink}
            to={'/'}
          >
            <PersonIcon
              className={classes.appBarButtonIcon}
            />
            <Typography className={classes.appBarButtonTitle}>
              List of users
            </Typography>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(AppHeader);
