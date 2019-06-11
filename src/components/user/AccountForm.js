import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';

// Styles
import styles from '../../styles';

// Component
import Avatar from '../Avatar';

// Validators
import {
  imageValidator,
  uniqueValidator,
  requiredValidator,
  confirmationValidator,
} from '../../utils/validators';

const AccountForm = ({ onSubmit, initialValues, back, onBack, onInput }) => {
  const isLoaded = useMemo(() => Object.keys(initialValues).length !== 0, [initialValues]);

  if (!isLoaded) {
    return false;
  }

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
          {
            // Hook on change any value in form
            onInput(values)
          }

          <div>
            <Field
              name="avatar"
              component={Avatar}
              validate={imageValidator.bind(null, 1)}
            />

            {errors.avatar && touched.avatar && (
              <div>{errors.avatar}</div>
            )}
          </div>

          <div>
            <Field
              name="username"
              placeholder="User name"
              validate={uniqueValidator.bind(null, initialValues.username, 'users', 'username', 'User name')}
            />

            {errors.username && touched.username && (
              <div>{errors.username}</div>
            )}
          </div>

          <div>
            <Field
              name="password"
              placeholder="password"
              validate={requiredValidator}
            />

            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}
          </div>

          <div>
            <Field
              name="repeatPassword"
              placeholder="Repeat password"
              validate={confirmationValidator.bind(null, values.password, 'Password')}
            />

            {errors.repeatPassword && touched.repeatPassword && (
              <div>{errors.repeatPassword}</div>
            )}
          </div>

          { back &&
          <button
            type="button"
            onClick={onBack.bind(null, values)}
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
