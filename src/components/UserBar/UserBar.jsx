import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon.jsx';
import styles from './UserBar.module.css';

import { ROUTER } from '../../constants/router.js';
import { useAuth } from '../../hooks';
import LogOutModal from '../LogOutModal/LogOutModal.jsx';

const UserBar = () => {
  const { user } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const wrapper = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapper.current && !wrapper.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapper}>
      <button
        className={styles.card}
        onClick={() => setIsDropdownOpen((prevState) => !prevState)}
      >
        <img src={user.avatar} alt={user.name} className={styles.avatar} />

        <div className={styles.name}>{user.name}</div>

        <Icon
          name="chevron-down"
          className={`${styles.chevron} ${isDropdownOpen ? styles.chevronUp : ''}`}
          size={18}
        />
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <ul>
            <li onClick={closeDropdown}>
              <Link
                className={styles.dropdownItem}
                to={`${ROUTER.USER}/${user.id}`}
              >
                Profile
              </Link>
            </li>
            <li onClick={closeDropdown}>
              <button
                className={styles.dropdownItem}
                onClick={() => setIsLogOutModalOpen(true)}
              >
                Log Out <Icon name="arrow-up-right" size={18} />
              </button>
            </li>
          </ul>
        </div>
      )}

      <LogOutModal
        isOpen={isLogOutModalOpen}
        onClose={() => setIsLogOutModalOpen(false)}
      />
    </div>
  );
};

export default UserBar;
