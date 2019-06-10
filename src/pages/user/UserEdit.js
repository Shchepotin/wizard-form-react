import React, {useEffect} from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { requestUser } from '../../actions/user';

import AccountEdit from './edit/AccountEdit';
import ProfileEdit from './edit/ProfileEdit';
import ContactEdit from './edit/ContactEdit';
import CapabilityEdit from './edit/CapabilityEdit';

import styles from '../../styles';
import PropTypes from "prop-types";

const UserEdit = ({ match, requestUser }) => {
  useEffect(() => {
    requestUser({
      id: Number(match.params.id),
    });
  }, [requestUser, match.params.id]);

  return (
    <Container maxWidth="md">
      Edit user

      <Switch>
        <Route
          path={`/user/edit/:id/account`}
          exact
          component={AccountEdit}
        />
        <Route
          path={`/user/edit/:id/profile`}
          exact
          component={ProfileEdit}
        />
        <Route
          path={`/user/edit/:id/contact`}
          exact
          component={ContactEdit}
        />
        <Route
          path={`/user/edit/:id/capability`}
          exact
          component={CapabilityEdit}
        />
      </Switch>
    </Container>
  );
};

UserEdit.propTypes = {
  requestUser: PropTypes.func.isRequired,
};

export default connect(() => ({}), {
  requestUser,
})(withStyles(styles)(UserEdit));
