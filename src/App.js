import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import history from './history';
import styles from './styles';

// Components
import AppHeader from './components/AppHeader';

// Pages
import UserCreate from './pages/user/UserCreate';
import UserEdit from './pages/user/UserEdit';
import UserList from './pages/user/UserList';
import UserView from './pages/user/UserView';
import NotFound from './pages/NotFound';

const App = ({ classes }) => {
  return (
    <Router history={history}>
      <div className={classes.root}>
        <AppHeader />

        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/user/create" exact component={UserCreate} />
          <Route path="/user/edit/:id/:tab" exact component={UserEdit} />
          <Route path="/user/view/:id" exact component={UserView} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default withStyles(styles)(App);
