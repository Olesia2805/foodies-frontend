import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../constants/router';
import styles from './Hero.module.css';
import Container from '../Container/Container';
import HeroModal from '/src/components/HeroModal/HeroModal';
import SignInModal from '../SignInModal/SignInModal';
import { useAuth } from '../../hooks';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddRecipeClick = () => {
    if (isAuthenticated) {
      navigate(ROUTER.ADD_RECIPE);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>IMPROVE YOUR CULINARY TALENTS</h1>
          <p className={styles.subtitle}>
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </p>
          <button
            className={styles.addRecipeBtn}
            onClick={handleAddRecipeClick}
          >
            ADD RECIPE
          </button>
        </div>
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <img src="src/assets/img/1.png" alt="Delicious food" />
          </div>
          <div className={styles.smallImage}>
            <img src="src/assets/img/2.png" alt="Tasty dish" />
          </div>
        </div>
      </Container>

      {showModal && (
        <HeroModal onClose={closeModal}>
          <SignInModal />
        </HeroModal>
      )}
    </section>
  );
};

export default Hero;
