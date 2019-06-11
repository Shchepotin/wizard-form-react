import React from 'react';
import ReactDatePicker from 'react-date-picker';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const DatePicker = ({ field, form }) => {
  return (
    <div>
      <ReactDatePicker
        format="dd/MM/y"
        onChange={(newValue) => form.setFieldValue(field.name, newValue)}
        value={field.value}
      />
    </div>
  );
};

export default withStyles(styles)(DatePicker);
