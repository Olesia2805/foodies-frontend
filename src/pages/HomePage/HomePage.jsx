import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container/Container';
import Hero from '../../components/Hero/Hero';
import Testimonials from '../../components/Testimonials/Testimonials';
import Recipes from '../../components/Recipes/Recipes';
import Categories from '../../components/Categories/Categories';
import SignInModal from '../../components/SignInModal/SignInModal';
import { ROUTER } from '../../constants/router';
import { useAuth } from '../../hooks';
import {
  setSelectedCategory,
  setSelectedIngredients,
  setSelectedArea
} from '../../redux/common/slice';
import { clearRecipes, setPage } from '../../redux/recipes/slice';

const HomePage = () => {
  const [showRecipes, setShowRecipes] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipesRef = useRef(null);
  const categoriesRef = useRef(null);

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

    setTimeout(() => {
      if (recipesRef.current) {
        recipesRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBackClick = () => {
    setShowRecipes(false);
    dispatch(setSelectedCategory(null));
    dispatch(clearRecipes());

    setTimeout(() => {
      if (categoriesRef.current) {
        categoriesRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
    </>
  );
};

export default HomePage;