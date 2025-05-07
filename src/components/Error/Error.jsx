import React from 'react';
import styles from './Error.module.css';

const Error = ({ message }) => {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
};

export default Error;
