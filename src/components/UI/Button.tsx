import React from 'react';

import classes from './Button.module.scss';

type Props = {
  type: 'button' | 'submit' | 'reset';
  color?: 'success' | 'danger';
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ type, color, onClick, children }) => {
  return (
    <button
      type={type}
      className={`${classes.button} ${color && classes[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
