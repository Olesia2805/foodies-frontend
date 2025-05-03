import Container from '../Container/Container.jsx';
import Divider from '../Divider/Divider.jsx';
import Logo from '../Logo/Logo.jsx';
import SocialNetworks from '../SocianNetworks/SocialNetworks.jsx';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <Logo />

          <SocialNetworks />
        </div>
      </Container>

      <Divider />

      <Container>
        <div className={styles.copyright}>
          &copy; 2024, Foodies. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
