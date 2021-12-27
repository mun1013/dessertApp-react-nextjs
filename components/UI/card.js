import React from 'react';
import classes from './card.module.css';

const Card = props => {
  return <div className={classes.card} style={props.style}>{props.children}</div>;
};

export default Card;
