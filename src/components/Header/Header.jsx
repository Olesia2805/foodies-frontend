import Container from '../Container/Container.jsx';
import Logo from '../Logo/Logo.jsx';
import AuthBar from '../AuthBar/AuthBar.jsx';
import Nav from '../Nav/Nav.jsx';
import styles from './Header.module.css';
import UserBar from '../UserBar/UserBar.jsx';
import MobileNav from '../MobileNav/MobileNav.jsx';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Logo variant={isHomePage ? 'secondary' : 'primary'} />

          {!isAuthenticated && <AuthBar />}

          {isAuthenticated && (
            <>
              <Nav isHomePage={isHomePage} />

              <div className={styles.right}>
                <UserBar />

                <MobileNav />
              </div>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
