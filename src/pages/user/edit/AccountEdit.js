import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { saveUser } from '../../../actions/user';

// Styles
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../styles';

// Components
import AccountForm from '../../../components/user/AccountForm';

const AccountEdit = ({ user, saveUser }) => {
  const onSubmit = (values) => {
    saveUser({
      ...user,
      ...values,
    });
  };

  return (
    <AccountForm
      initialValues={user}
      onSubmit={onSubmit}
    />
  );
};

AccountEdit.propTypes = {
  user: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({
  user: user.item,
}), {
  saveUser,
})(withStyles(styles)(AccountEdit));
