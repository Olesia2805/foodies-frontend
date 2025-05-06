import { NavLink } from 'react-router-dom';

import { NAV } from '../../constants/nav.js';

import styles from './Nav.module.css';

const Nav = ({ isHomePage = false }) => {
  return (
    <nav>
      <ul className={styles.nav}>
        {NAV.map(({ href, title }) => (
          <li key={title}>
            <NavLink
              to={href}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.activeLink : ''} ${
                  isHomePage ? styles.homePageLink : ''
                }`
              }
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
