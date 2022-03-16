import React from 'react';

import classes from './Box.module.scss';

class Box extends React.Component {
  render() {
    return <div className={classes.box}>{this.props.children}</div>;
  }
}

export default Box;
