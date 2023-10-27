import React from 'react';
import { motion } from 'framer-motion';
import classes from './Button.module.css';

const Button = props => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: '#f204a3' }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500 }}
      type={props.type} className={classes.button} onClick={props.onClick}>
      {props.children}
    </motion.button>
  );
};

export default Button;