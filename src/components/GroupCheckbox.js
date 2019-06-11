import React, { Fragment } from 'react';
import MaterialCheckbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const GroupCheckbox = ({ field, form, ...props }) => {
  const onChange = (item) => () => {
    const oldValue = field.value || [];

    if (!(field.value || []).find(data => data.id === item.id)) {
      form.setFieldValue(field.name, [
        ...oldValue,
        item,
      ])
    } else {
      form.setFieldValue(field.name, oldValue.filter(data => data.id !== item.id))
    }
    //
  };

  return (
    <Fragment>
      {props.options.map(item => (
        <div
          key={item.id}
        >
          <MaterialCheckbox
            checked={!!(field.value || []).find(data => data.id === item.id)}
            onChange={onChange(item)}
          />

          { item.label }
        </div>
      ))}
    </Fragment>
  );
};

export default withStyles(styles)(GroupCheckbox);
