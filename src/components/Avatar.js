import React, { useState, useRef, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const AppHeader = ({ field, form }) => {
  const fileInput = useRef();
  const [avatar, setAvatar] = useState(null);

  const readFileUrl = (file) => {
    const reader = new FileReader();

    reader.onload = e => {
      form.setFieldValue(field.name, e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const onChange = () => {
    const file = fileInput.current.files[0];

    readFileUrl(file);
  };

  useEffect(() => {
    if (field.value) {
      setAvatar(field.value);
    }
  }, [field.value]);

  return (
    <div>
      <img width={300} src={avatar} alt="avatar" />
      <input type="file" ref={fileInput} onChange={onChange} />
    </div>
  );
};

export default withStyles(styles)(AppHeader);
