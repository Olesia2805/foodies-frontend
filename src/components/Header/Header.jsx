import Container from '../Container/Container.jsx';
import Logo from '../Logo/Logo.jsx';
import AuthBar from '../AuthBar/AuthBar.jsx';
import Nav from '../Nav/Nav.jsx';
import styles from './Header.module.css';
import UserBar from '../UserBar/UserBar.jsx';
import MobileNav from '../MobileNav/MobileNav.jsx';

import { useAuth } from '../../hooks';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Logo />

          {!isAuthenticated && <AuthBar />}

          {isAuthenticated && (
            <>
              <Nav />

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
