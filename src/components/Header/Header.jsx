import Container from '../Container/Container.jsx';
import Logo from '../Logo/Logo.jsx';
import AuthBar from '../AuthBar/AuthBar.jsx';
import Nav from '../Nav/Nav.jsx';
import styles from './Header.module.css';
import UserBar from '../UserBar/UserBar.jsx';
import MobileNav from '../MobileNav/MobileNav.jsx';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';
import clsx from 'clsx';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header
      className={clsx(styles.header, {
        [styles.homePageHeader]: isHomePage,
      })}
    >
      <Container>
        <div className={styles.wrapper}>
          <Logo variant={isHomePage ? 'secondary' : 'primary'} />

          {!isAuthenticated && <AuthBar />}

          {isAuthenticated && (
            <>
              <Nav isHomePage={isHomePage} />

              <div className={styles.right}>
                <UserBar />

                <MobileNav isHomePage={isHomePage} />
              </div>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
