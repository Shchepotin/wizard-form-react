import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core';
import styles from '../styles';
import { connect } from "react-redux";

const NotFound = () => {
  return (
    <Grid
      container
      justify="center"
    >
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
            >
              404
            </Typography>
            <Typography
              color="textSecondary"
            >
              Page not found.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              component={RouterLink}
              to={'/'}
            >
              Homepage
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default connect(() => ({}), {})(withStyles(styles)(NotFound));
