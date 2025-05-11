import React from 'react';
import clsx from 'clsx';
import styles from './Loader.module.css';

const Loader = ({
  size = 'medium',
  className,
  fullScreen = false,
  pageLoader = false,
}) => {
  const sizeClassMap = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  if (fullScreen || pageLoader) {
    return (
      <div
        className={clsx(styles.container, {
          [styles.pageLoader]: pageLoader,
        })}
        style={{ height: '100vh' }}
      >
        <div className={clsx(styles.loader, sizeClassMap[size], className)} />
      </div>
    );
  }

  return <div className={clsx(styles.loader, sizeClassMap[size], className)} />;
};

export default Loader;
