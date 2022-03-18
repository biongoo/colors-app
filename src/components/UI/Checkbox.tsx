import React from 'react';

import classes from './Checkbox.module.scss';

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

const Checkbox: React.FC<Props> = ({ id, label, checked, onChange }) => {
  return (
    <label htmlFor={id} className={classes.container}>
      {label}
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <span className={classes.checkmark}></span>
    </label>
  );
};

export default Checkbox;
