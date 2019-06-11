import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Field, Form, FieldArray } from 'formik';
import { withStyles } from '@material-ui/core/styles';

// Styles
import styles from '../../styles';

const ContactForm = ({ onSubmit, initialValues, back, onBack, onInput }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize={true}
      initialValues={{
        company: initialValues.company,
        fax: initialValues.fax,
        githubLink: initialValues.githubLink,
        facebookLink: initialValues.facebookLink,
        phones: initialValues.phones,
      }}
    >
      {({ errors, touched, values }) => (
        <Form className="whatever">
          { onInput(values) }

          <Field name="company" placeholder="Company" />
          <Field name="fax" placeholder="Fax" />
          <Field name="githubLink" placeholder="Github link" />
          <Field name="facebookLink" placeholder="facebookLink" />

          <FieldArray
            name="phones"
            render={arrayHelpers => (
              <div>
                {values.phones && values.phones.length > 0 && (
                  values.phones.map((phone, index) => (
                    <div key={index}>
                      <Field name={`phones.${index}`}/>
                      {values.phones.length !== 1 && (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))
                )}
                { values.phones.length !== 3 && (
                  <button type="button" onClick={() => arrayHelpers.push('')}>
                    Add phone
                  </button>
                )}
              </div>
            )}
          />

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

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInput: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  onBack: PropTypes.func,
  back: PropTypes.string,
};

ContactForm.defaultProps = {
  onBack: () => {},
  onInput: () => {},
  back: '',
};

export default connect(() => ({}), {})(withStyles(styles)(ContactForm));
