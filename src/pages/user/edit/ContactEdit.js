import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from "luxon";
import { connect } from 'react-redux';

// Actions
import { saveUser } from '../../../actions/user';

// Styles
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../styles';

// Components
import ContactForm from '../../../components/user/ContactForm';

const ContactEdit = ({ user, saveUser }) => {
  const onSubmit = (values) => {
    saveUser({
      ...user,
      ...values,
      updatedAt: DateTime.local().toJSDate(),
    });
  };

  return (
    <ContactForm
      initialValues={user}
      onSubmit={onSubmit}
    />
  );
};

ContactEdit.propTypes = {
  user: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
};

export default connect(({ user }) => ({
  user: user.item,
}), {
  saveUser,
})(withStyles(styles)(ContactEdit));
