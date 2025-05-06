import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '../Icon/Icon.jsx';
import Logo from '../Logo/Logo.jsx';

import { NAV } from '../../constants/nav.js';

import styles from './MobileNav.module.css';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        <Icon name="burger" className={styles.openIcon} size={28} />
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
        <div className={styles.header}>
          <Logo variant="secondary" />

          <button className={styles.button} onClick={() => setIsOpen(false)}>
            <Icon name="close" className={styles.closeIcon} size={28} />
          </button>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            {NAV.map(({ href, title }) => (
              <li key={title} onClick={() => setIsOpen(false)}>
                <NavLink to={href} className={styles.link}>
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
