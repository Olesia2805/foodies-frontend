import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container/Container';
import Recipes from '../../components/Recipes/Recipes';
import { ROUTER } from '../../constants/router';
import { useAuth } from '../../hooks';
import { setSelectedCategory } from '../../redux/common/slice';
import { fetchRecipes } from '../../redux/recipes/operations';

const HomePage = () => {
  const [showRecipes, setShowRecipes] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserAvatarClick = (userId) => {
    if (isAuthenticated) {
      navigate(`${ROUTER.USER}/${userId}`);
    } else {
      console.log('Open sign in modal');
    }
  };

  const handleRecipeDetailsClick = (recipeId) => {
    navigate(`${ROUTER.RECIPE}/${recipeId}`);
  };

  const handleShowRecipes = () => {
    // Створюємо фіктивну категорію
    const dummyCategory = {
      id: '12',
      name: 'Breakfast',
      description: 'Delicious breakfast recipes for a great start to your day!'
    };

    // Встановлюємо вибрану категорію в Redux
    dispatch(setSelectedCategory(dummyCategory));

    // Завантажуємо рецепти для цієї категорії
    dispatch(fetchRecipes({
      page: 1,
      category: dummyCategory.id
    }));

    // Показуємо компонент Recipes
    setShowRecipes(true);
  };

  return (
    <Container>
      {showRecipes ? (
        <Recipes
          onUserAvatarClick={handleUserAvatarClick}
          onRecipeDetailsClick={handleRecipeDetailsClick}
        />
      ) : (
        <div>
          <button onClick={handleShowRecipes}>Show Recipes</button>
        </div>
      )}
    </Container>
  );
};

export default HomePage;