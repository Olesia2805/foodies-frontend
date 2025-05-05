import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon.jsx';
import styles from './UserBar.module.css';

import { ROUTER } from '../../constants/router.js';
import { useAuth } from '../../hooks';

const UserBar = () => {
  const { user, logOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const wrapper = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapper.current && !wrapper.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapper}>
      <button
        className={styles.card}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <img src={user.avatar} alt={user.name} className={styles.avatar} />

        <div className={styles.name}>{user.name}</div>

        <Icon
          name="chevron-down"
          className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}
          size={18}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <ul>
            <li onClick={closeDropdown}>
              <Link className={styles.dropdownItem} to={ROUTER.PROFILE}>
                Profile
              </Link>
            </li>
            <li onClick={closeDropdown}>
              <button className={styles.dropdownItem} onClick={logOut}>
                Log Out <Icon name="arrow-up-right" size={18} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserBar;
