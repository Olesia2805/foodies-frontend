import Hero from 'components/Hero/Hero';
import Testimonials from '../../components/Testimonials/Testimonials';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container/Container';
import Recipes from '../../components/Recipes/Recipes';
import SignInModal from '../../components/SignInModal/SignInModal';
import { ROUTER } from '../../constants/router';
import { useAuth } from '../../hooks';
import { setSelectedCategory, setSelectedIngredients, setSelectedArea } from '../../redux/common/slice';
import { clearRecipes, setPage } from '../../redux/recipes/slice';

const HomePage = () => {
  const [showRecipes, setShowRecipes] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserAvatarClick = (userId) => {
    if (isAuthenticated) {
      navigate(`${ROUTER.USER}/${userId}`);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const handleRecipeDetailsClick = (recipeId) => {
    navigate(`${ROUTER.RECIPE}/${recipeId}`);
  };

  const handleShowRecipes = () => {
    dispatch(clearRecipes());
    dispatch(setSelectedIngredients([]));
    dispatch(setSelectedArea(null));
    dispatch(setPage(1));

    setTimeout(() => {
      // Створюємо фіктивну категорію
      const dummyCategory = {
        id: '6',
        name: 'Dessert',
        description: 'A sweet course typically served at the end of a meal. Desserts can include a wide variety of items such as cakes, pastries, ice cream, and fruit, and are often enjoyed for their rich flavors and textures.'
      };

      // Встановлюємо вибрану категорію в Redux
      dispatch(setSelectedCategory(dummyCategory));

      // Показуємо компонент Recipes
      setShowRecipes(true);
    }, 0);
  };

  const handleBackClick = () => {
    setShowRecipes(false);
  };

  return (
    <>
      <Hero />
        <Container>
          {showRecipes ? (
            <Recipes
              onUserAvatarClick={handleUserAvatarClick}
              onRecipeDetailsClick={handleRecipeDetailsClick}
              onBackClick={handleBackClick}
            />
          ) : (
            <div>
              <button onClick={handleShowRecipes}>Show Recipes</button>
            </div>
          )}

          {/* Модальне вікно для входу */}
          <SignInModal
            isOpen={isSignInModalOpen}
            onClose={() => setIsSignInModalOpen(false)}
            setOtherModal={() => {
              setIsSignInModalOpen(false);
            }}
          />
        </Container>
      <Testimonials />
    </>
  );
};

export default HomePage;
