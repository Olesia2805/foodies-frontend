import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../Container/Container';
import SignInModal from '../SignInModal/SignInModal';
import Button from '../Button/Button';
import HeroImages from '../HeroImages/HeroImages';

import { ROUTER } from '../../constants/router';

import { useAuth } from '../../hooks';

import styles from './Hero.module.css';

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
    <>
      <Container size="large">
        <section className={styles.hero}>
          <div className={`${styles.verticalLine} ${styles.line1}`}></div>
          <div className={`${styles.verticalLine} ${styles.line2}`}></div>
          <div className={`${styles.verticalLine} ${styles.line3}`}></div>
          <div className={`${styles.verticalLine} ${styles.line4}`}></div>

          <Container>
            <div className={styles.content}>
              <h1 className={styles.title}>IMPROVE YOUR CULINARY TALENTS</h1>

              <p className={styles.subtitle}>
                Amazing recipes for beginners in the world of cooking,
                enveloping you in the aromas and tastes of various cuisines.
              </p>

              <Button
                onClick={handleAddRecipeClick}
                variant="outlined"
                color="secondary"
                size="small"
              >
                ADD RECIPE
              </Button>
            </div>
          </Container>

          <SignInModal
            isOpen={isSignInModalOpen}
            onClose={() => setIsSignInModalOpen(false)}
          />
        </section>
      </Container>
      <HeroImages />
    </>
  );
};

export default Hero;
