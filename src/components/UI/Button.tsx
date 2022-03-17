import React from 'react';

import classes from './Button.module.scss';

type Props = {
  type: 'button' | 'submit' | 'reset';
};

const Button: React.FC<Props> = ({ type, children }) => {
  return (
    <button type={type} className={classes.button}>
      {children}
    </button>
  );
};

export default Button;
