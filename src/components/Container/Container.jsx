import clsx from 'clsx';

import styles from './Container.module.css';

const Container = ({ children, size = 'default' }) => {
  return (
    <div
      className={clsx(styles.container, {
        [styles.large]: size === 'large',
      })}
    >
      {children}
    </div>
  );
};

export default Container;
