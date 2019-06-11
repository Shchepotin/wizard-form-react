import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';

// Styles
import styles from '../../styles';

const CapabilityForm = ({ onSubmit, initialValues, back, onBack, onInput }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize={true}
      initialValues={{
        additionalInfo: initialValues.additionalInfo,
      }}
    >
      {({ errors, touched, values }) => (
        <Form className="whatever">
          { onInput(values) }

          <Field name="additionalInfo" placeholder="Additional info" />

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

CapabilityForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInput: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  onBack: PropTypes.func,
  back: PropTypes.string,
};

CapabilityForm.defaultProps = {
  onBack: () => {},
  onInput: () => {},
  back: '',
};

export default connect(() => ({}), {})(withStyles(styles)(CapabilityForm));
