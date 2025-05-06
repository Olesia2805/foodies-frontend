import React from 'react';
import clsx from 'clsx';
import styles from './Loader.module.css';

const Loader = ({ size = 'medium', className, fullScreen = false }) => {
  const sizeClassMap = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large
  };

  if (fullScreen) {
    return (
      <div className={styles.container} style={{ height: '100vh' }}>
        <div className={clsx(styles.loader, sizeClassMap[size], className)} />
      </div>
    );
  }

  return (
    <div className={clsx(styles.loader, sizeClassMap[size], className)} />
  );
};

export default Loader;
