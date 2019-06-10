import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';

// Styles
import styles from '../../styles';

// Component
import Avatar from '../Avatar';

const AccountForm = ({ onSubmit, initialValues, back, onBack, onInput }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize={true}
      initialValues={{
        avatar: initialValues.avatar,
        username: initialValues.username,
        password: initialValues.password,
        repeatPassword: initialValues.repeatPassword,
      }}
    >
      {({ errors, touched, values }) => (
        <Form className="whatever">
          { onInput(values) }
          <Field name="avatar" component={Avatar} />
          <Field name="username" placeholder="User name" />
          {errors.username && touched.username && <div>{errors.username}</div>}
          <Field name="password" placeholder="password" />
          <Field name="repeatPassword" placeholder="Repeat password" />

          { back &&
          <button
            type="button"
            onClick={onBack}
          >
            { back }
          </button>
          }

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

AccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInput: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  onBack: PropTypes.func,
  back: PropTypes.string,
};

AccountForm.defaultProps = {
  onBack: () => {},
  onInput: () => {},
  back: '',
};

export default connect(() => ({}), {})(withStyles(styles)(AccountForm));
