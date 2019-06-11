import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import DatePicker from '../DatePicker';

// Styles
import styles from '../../styles';

// Validators
import {
  emailValidator,
  requiredValidator,
  ageValidator,
} from '../../utils/validators';

const ProfileForm = ({ onSubmit, initialValues, onBack, back, onInput }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize={true}
      initialValues={{
        fistName: initialValues.fistName,
        lastName: initialValues.lastName,
        birthDate: initialValues.birthDate,
        email: initialValues.email,
        address: initialValues.address,
        gender: initialValues.gender,
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
              name="fistName"
              placeholder="First name"
              validate={requiredValidator}
            />

            {errors.fistName && touched.fistName && (
              <div>{errors.fistName}</div>
            )}
          </div>

          <div>
            <Field
              name="lastName"
              placeholder="Last name"
              validate={requiredValidator}
            />

            {errors.lastName && touched.lastName && (
              <div>{errors.lastName}</div>
            )}
          </div>

          <div>
            <Field
              name="birthDate"
              component={DatePicker}
              validate={ageValidator.bind(null, 18)}
            />

            {errors.birthDate && touched.birthDate && (
              <div>{errors.birthDate}</div>
            )}
          </div>

          <div>
            <Field
              name="email"
              placeholder="Email"
              validate={emailValidator.bind(null, 'users', 'email', 'Email')}
            />

            {errors.email && touched.email && (
              <div>{errors.email}</div>
            )}
          </div>

          <div>
            <Field
              name="address"
              placeholder="Address"
            />

            {errors.address && touched.address && (
              <div>{errors.address}</div>
            )}
          </div>

          <div>
            Gender

            <label>
              female
              <Field
                name="gender"
                type="radio"
                checked={values.gender === 'female'}
                validate={requiredValidator}
                value="female"
              />
            </label>

            <label>
              male
              <Field
                name="gender"
                type="radio"
                checked={values.gender === 'male'}
                validate={requiredValidator}
                value="male"
              />
            </label>

            {errors.gender && touched.gender && (
              <div>{errors.gender}</div>
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
