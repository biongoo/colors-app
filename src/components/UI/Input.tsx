import React from 'react';

import classes from './Input.module.scss';

type Props = {
  id: string;
  type: string;
  label: string;
  value: string;
  error: string;
  placeholder: string;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({
  id,
  type,
  label,
  value,
  error,
  placeholder,
  onBlur,
  onChange,
}) => {
  return (
    <div className={`${classes.inputBox} ${error && classes.invalid}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className={classes.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
