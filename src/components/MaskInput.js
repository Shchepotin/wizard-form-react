import React from 'react';
import ReactInputMask from 'react-input-mask';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const MaskInput = ({ field, form }) => {
  return (
    <ReactInputMask
      mask="+7 (999) 999-99-99"
      onChange={(newValue) => form.setFieldValue(field.name, newValue.target.value)}
      value={field.value}
      alwaysShowMask={false}
      maskChar="X"
    />
  );
};

export default withStyles(styles)(MaskInput);
