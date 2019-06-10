import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { requestUser } from '../../actions/user';
import history from '../../history';

import styles from '../../styles';

const UserView = ({ user, match, requestUser }) => {
  useEffect(() => {
    requestUser({
      id: Number(match.params.id),
    });
  }, [requestUser, match.params.id]);

  return (
    <div>
      <button type="button" onClick={() => history.goBack()}>back</button>
      { user.email }

      <Link
        to={`/user/edit/${match.params.id}/account`}
      >
        Edit account
      </Link>

      <Link
        to={`/user/edit/${match.params.id}/profile`}
      >
        Edit profile
      </Link>

      <Link
        to={`/user/edit/${match.params.id}/contact`}
      >
        Edit contact
      </Link>

      <Link
        to={`/user/edit/${match.params.id}/capability`}
      >
        Edit capability
      </Link>
    </div>
  );
};

UserView.propTypes = {
  user: PropTypes.object.isRequired,
  requestUser: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({
  user: user.item,
}), {
  requestUser,
})(withStyles(styles)(UserView));
