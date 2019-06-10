import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { saveUser } from '../../../actions/user';

// Styles
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../styles';

// Components
import CapabilityForm from '../../../components/user/CapabilityForm';

const CapabilityEdit = ({ user, saveUser }) => {
  const onSubmit = (values) => {
    saveUser({
      ...user,
      ...values,
    });
  };

  return (
    <CapabilityForm
      initialValues={user}
      onSubmit={onSubmit}
    />
  );
};

CapabilityEdit.propTypes = {
  user: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({
  user: user.item,
}), {
  saveUser,
})(withStyles(styles)(CapabilityEdit));
