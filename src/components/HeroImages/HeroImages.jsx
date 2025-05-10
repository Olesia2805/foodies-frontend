import clsx from 'clsx';

import Container from '../Container/Container.jsx';

import leftImage from '../../assets/img/1.webp';
import rightImage from '../../assets/img/2.webp';

import styles from './HeroImages.module.css';

const HeroImages = () => {
  return (
    <Container>
      <div className={styles.imageContainer}>
        <img
          src={leftImage}
          className={clsx(styles.image, styles.leftImage)}
          alt="Delicious food"
        />

        <img
          src={rightImage}
          className={clsx(styles.image, styles.rightImage)}
          alt="Tasty dish"
        />
      </div>
    </Container>
  );
};

export default HeroImages;
