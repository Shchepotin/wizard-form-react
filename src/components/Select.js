import React from 'react';
import ReactSelect from 'react-select';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const Select = ({ field, form, ...props }) => {
  return (
    <ReactSelect
      onChange={(newValue) => form.setFieldValue(field.name, newValue)}
      value={field.value}
      options={props.options}
      isMulti={props.isMulti}
    />
  );
};

export default withStyles(styles)(Select);
