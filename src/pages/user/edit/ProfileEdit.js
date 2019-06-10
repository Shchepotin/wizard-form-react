import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { saveUser } from '../../../actions/user';

// Styles
import styles from '../../../styles';
import { withStyles } from '@material-ui/core/styles';

// Components
import ProfileForm from '../../../components/user/ProfileForm';

const ProfileEdit = ({ user, saveUser }) => {
  const onSubmit = (values) => {
    saveUser({
      ...user,
      ...values,
    });
  };

  return (
    <ProfileForm
      initialValues={user}
      onSubmit={onSubmit}
    />
  );
};

ProfileEdit.propTypes = {
  user: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({
  user: user.item,
}), {
  saveUser,
})(withStyles(styles)(ProfileEdit));
