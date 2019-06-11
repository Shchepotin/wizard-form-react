import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';

// Components
import Select from '../Select';
import GroupCheckbox from '../GroupCheckbox';

// Styles
import styles from '../../styles';

// Validators
import {
  requiredItemValidator,
  maxLengthValidator,
} from '../../utils/validators';

const CapabilityForm = ({ onSubmit, initialValues, back, onBack, onInput, skillList, hobbyList }) => {
  const isLoaded = useMemo(() => Object.keys(initialValues).length !== 0, [initialValues]);

  if (!isLoaded) {
    return false;
  }

  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize={true}
      initialValues={{
        additionalInfo: initialValues.additionalInfo,
        skills: initialValues.skills,
        hobbies: initialValues.hobbies,
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
              name="skills"
              component={Select}
              options={skillList}
              isMulti
              placeholder="Skills"
              validate={requiredItemValidator.bind(null, 3)}
            />

            {errors.skills && touched.skills && (
              <div>{errors.skills}</div>
            )}
          </div>

          <div>
            <Field
              component="textarea"
              name="additionalInfo"
              placeholder="Additional info"
              validate={maxLengthValidator.bind(null, 300)}
            />

            {errors.additionalInfo && touched.additionalInfo && (
              <div>{errors.additionalInfo}</div>
            )}
          </div>

          <div>
            Hobbies

            <Field
              name="hobbies"
              component={GroupCheckbox}
              options={hobbyList}
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

export default connect(({ skillList, hobbyList }) => ({
  skillList: skillList.items,
  hobbyList: hobbyList.items,
}), {})(withStyles(styles)(CapabilityForm));
