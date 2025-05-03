import Container from '../Container/Container.jsx';
import Logo from '../Logo/Logo.jsx';

import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Logo />
        </div>
      </Container>
    </header>
  );
};

export default Header;
