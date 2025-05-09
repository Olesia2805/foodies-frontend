import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../constants/router';
import styles from './Hero.module.css';
import Container from '../Container/Container';
import SignInModal from '../SignInModal/SignInModal';
import { useAuth } from '../../hooks';
import Button from '../Button/Button';

const Hero = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddRecipeClick = () => {
    if (isAuthenticated) {
      navigate(ROUTER.ADD_RECIPE);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={`${styles.verticalLine} ${styles.line1}`}></div>
      <div className={`${styles.verticalLine} ${styles.line2}`}></div>
      <div className={`${styles.verticalLine} ${styles.line3}`}></div>
      <div className={`${styles.verticalLine} ${styles.line4}`}></div>

      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>IMPROVE YOUR CULINARY TALENTS</h1>
          <p className={styles.subtitle}>
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </p>
          <Button
            onClick={handleAddRecipeClick}
            className={styles.button}
          >
            ADD RECIPE
          </Button>
        </div>
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <img src="src/assets/img/1.png" alt="Delicious food" />
          </div>
          <div className={styles.secondImage}>
            <img src="src/assets/img/2.png" alt="Tasty dish" />
          </div>
        </div>
      </Container>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
