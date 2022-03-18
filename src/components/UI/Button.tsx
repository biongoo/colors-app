import React from 'react';

import classes from './Button.module.scss';

type Props = {
  type: 'button' | 'submit' | 'reset';
  color?: 'success' | 'danger';
  onClick?: () => void;
};

class Button extends React.Component<Props> {
  render() {
    return (
      <button
        type={this.props.type}
        className={`${classes.button} ${
          this.props.color && classes[this.props.color]
        }`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
