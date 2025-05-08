import { useState } from 'react';

import Categories from '../../components/Categories/Categories';
import Container from '../../components/Container/Container';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container/Container';
import Hero from '../../components/Hero/Hero';
import Testimonials from '../../components/Testimonials/Testimonials';
import Recipes from '../../components/Recipes/Recipes';
import SignInModal from '../../components/SignInModal/SignInModal';
import Categories from '../../components/Categories/Categories';
import { ROUTER } from '../../constants/router';
import { useAuth } from '../../hooks';
import {
  setSelectedCategory,
  setSelectedIngredients,
  setSelectedArea
} from '../../redux/common/slice';
import { clearRecipes, setPage } from '../../redux/recipes/slice';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showRecipes, setShowRecipes] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuthRequired = () => {
    setIsSignInModalOpen(true);
  };

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

  const handleCategorySelect = (category) => {
    dispatch(clearRecipes());
    dispatch(setSelectedIngredients([]));
    dispatch(setSelectedArea(null));
    dispatch(setPage(1));
    dispatch(setSelectedCategory(category));
    setShowRecipes(true);
  };

  const handleBackClick = () => {
    setShowRecipes(false);
    dispatch(setSelectedCategory(null));
    dispatch(clearRecipes());
  };

  // Test cases for different scenarios
  const handleShowAllCategories = () => {
    dispatch(clearRecipes());
    dispatch(setSelectedIngredients([]));
    dispatch(setSelectedArea(null));
    dispatch(setPage(1));

    // This represents "all categories" case
    const allCategory = {
      id: 'all',
      name: null,
      description: null
    };

    dispatch(setSelectedCategory(allCategory));
    setShowRecipes(true);
  };

  return (
    <div>
      <Hero />
      <Container>
        {selectedCategory ? (
          <div>Recipes</div>
        ) : (
          <Categories onCategorySelect={setSelectedCategory} />
        )}
        <Testimonials />
      </Container>
    </div>
      <Container>
        {showRecipes ? (
          <Recipes
            onUserAvatarClick={handleUserAvatarClick}
            onRecipeDetailsClick={handleRecipeDetailsClick}
            onBackClick={handleBackClick}
            onAuthRequired={handleAuthRequired}
          />
        ) : (
          <>
            <Categories onCategorySelect={handleCategorySelect} />
            {/* Тестова кнопка для різних сценаріїв */}
            <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button
                onClick={handleShowAllCategories}
                style={{
                  padding: '10px 20px',
                  background: 'var(--dark-grey)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Show All Recipes
              </button>
            </div>
          </>
        )}
        <SignInModal
          isOpen={isSignInModalOpen}
          onClose={() => setIsSignInModalOpen(false)}
          setOtherModal={() => {
            setIsSignInModalOpen(false);
          }}
        />
        <Testimonials />
      </Container>
    </>
  );
};

export default HomePage;
