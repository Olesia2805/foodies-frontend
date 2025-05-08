import Container from '../Container/Container.jsx';
import Divider from '../Divider/Divider.jsx';
import Logo from '../Logo/Logo.jsx';
import NetworkLinks from '../NetworkLinks/NetworkLinks.jsx';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <Logo />

          <NetworkLinks />
        </div>
      </Container>

      <Divider />

      <Container>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()}, Foodies. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
