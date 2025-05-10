import styles from './Typography.module.css';
import clsx from 'clsx';

const Typography = ({ children, variant = 'p', center = false }) => {
  const classes = clsx({
    [styles.center]: center,
    [styles.h3]: variant === 'h3',
  });

  switch (variant) {
    case 'h3':
      return <h2 className={classes}>{children}</h2>;
    case 'p':
    case 'default':
      return <p>{children}</p>;
  }
};

export default Typography;
