import { useEffect } from 'react';

import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import Container from '../Container/Container.jsx';
import Loader from '../Loader/Loader.jsx';
import Typography from '../Typography/Typography.jsx';

import useRecipe from '../../hooks/useRecipe.js';

import styles from './PopularRecipes.module.css';

const PopularRecipes = () => {
  const { popularRecipes, getPopularRecipes, isPopularRecipesLoading } =
    useRecipe();

  useEffect(() => {
    getPopularRecipes();
  }, []);

  if (isPopularRecipesLoading) return <Loader />;

  return (
    <div className={styles.popularProducts}>
      <Container>
        <Typography variant="h3">Popular recipes</Typography>

        <div className={styles.popularList}>
          {popularRecipes.map((recipe) => (
            <RecipeCard size="large" key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PopularRecipes;
