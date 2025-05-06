import { Link } from 'react-router-dom';

import styles from './Logo.module.css';

const Logo = ({ variant = 'primary' }) => {
  return (
    <Link
      to="/"
      className={`${styles.logo} ${variant === 'secondary' ? styles.logoSecondary : ''}`}
    >
      Foodies
    </Link>
  );
};

export default Logo;
