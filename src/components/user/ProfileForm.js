import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';

// Styles
import styles from '../../styles';

const ProfileForm = ({ onSubmit, initialValues, onBack, back, onInput }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize={true}
      initialValues={{
        fistName: initialValues.fistName,
        lastName: initialValues.lastName,
        email: initialValues.email,
      }}
    >
      {({ errors, touched, values }) => (
        <Form className="whatever">
          { onInput(values) }

          <Field name="fistName" placeholder="First name" />
          <Field name="lastName" placeholder="Last name" />
          <Field name="email" placeholder="Email" />

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

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInput: PropTypes.func,
  onBack: PropTypes.func,
  back: PropTypes.string,
  initialValues: PropTypes.object.isRequired,
};

ProfileForm.defaultProps = {
  onBack: () => {},
  onInput: () => {},
  back: '',
};

export default connect(() => ({}), {})(withStyles(styles)(ProfileForm));
