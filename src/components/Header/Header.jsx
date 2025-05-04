import Container from '../Container/Container.jsx';
import Logo from '../Logo/Logo.jsx';
import SignActions from '../SignActions/SignActions.jsx';
import { useAuth } from '../../hooks';

import styles from './Header.module.css';

const Header = () => {
  const { isAuthenticated, logOut } = useAuth();

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Logo />

          {!isAuthenticated && <SignActions />}

          {isAuthenticated && <button onClick={() => logOut()}>Log out</button>}
        </div>
      </Container>
    </header>
  );
};

export default Header;
