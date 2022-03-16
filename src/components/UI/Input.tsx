import React from 'react';

import classes from './Input.module.scss';

type Props = {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({ id, label, type, value, onChange }) => {
  return (
    <div className={classes.inputBox}>
      <label htmlFor={id}>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
