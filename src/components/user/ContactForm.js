import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Field, Form, FieldArray } from 'formik';
import { withStyles } from '@material-ui/core/styles';

// Components
import MaskInput from '../MaskInput';
import Select from '../Select';

// Styles
import styles from '../../styles';

// Validators
import {
  phoneValidator,
  requiredValidator,
} from '../../utils/validators';

const ContactForm = ({ onSubmit, initialValues, back, onBack, onInput, mainLanguageList }) => {
  const isLoaded = useMemo(() => Object.keys(initialValues).length !== 0, [initialValues]);

  if (!isLoaded) {
    return false;
  }

  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize={true}
      initialValues={{
        company: initialValues.company,
        fax: initialValues.fax,
        mainLanguage: initialValues.mainLanguage,
        githubLink: initialValues.githubLink,
        facebookLink: initialValues.facebookLink,
        phones: initialValues.phones,
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
              name="company"
              placeholder="Company"
              validate={requiredValidator}
            />

            {errors.company && touched.company && (
              <div>{errors.company}</div>
            )}
          </div>

          <div>
            <Field
              name="fax"
              component={MaskInput}
              placeholder="Fax"
              validate={phoneValidator.bind(null, 'Tax')}
            />

            {errors.fax && touched.fax && (
              <div>{errors.fax}</div>
            )}
          </div>

          <div>
            <Field
              name="mainLanguage"
              component={Select}
              options={mainLanguageList}
              placeholder="Main language"
              validate={requiredValidator}
            />

            {errors.mainLanguage && touched.mainLanguage && (
              <div>{errors.mainLanguage}</div>
            )}
          </div>

          <div>
            <Field
              name="githubLink"
              placeholder="Github link"
            />

            {errors.githubLink && touched.githubLink && (
              <div>{errors.githubLink}</div>
            )}
          </div>

          <div>
            <Field
              name="facebookLink"
              placeholder="Facebook link"
            />

            {errors.facebookLink && touched.facebookLink && (
              <div>{errors.facebookLink}</div>
            )}
          </div>

          <div>
            <FieldArray
              name="phones"
              render={arrayHelpers => (
                <div>
                  {values.phones && values.phones.length > 0 && (
                    values.phones.map((phone, index) => (
                      <div key={index}>
                        <Field
                          component={MaskInput}
                          name={`phones.${index}`}
                          validate={phoneValidator.bind(null, 'Phone')}
                        />

                        {values.phones.length !== 1 && (
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                        )}

                        {errors.phones && touched.phones && errors.phones[index] && touched.phones[index] && (
                          <div>{errors.phones[index]}</div>
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

ContactForm.propTypes = {
  mainLanguageList: PropTypes.array.isRequired,
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

export default connect(({ mainLanguageList }) => ({
  mainLanguageList: mainLanguageList.items,
}), {})(withStyles(styles)(ContactForm));
