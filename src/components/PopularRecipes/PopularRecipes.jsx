import { useEffect } from 'react';

import Container from '../Container/Container.jsx';
import Loader from '../Loader/Loader.jsx';
import Typography from '../Typography/Typography.jsx';

import useRecipe from '../../hooks/useRecipe.js';

import styles from './PopularRecipes.module.css';
import SimpleRecipeCard from '../SimpleRecipeCard/SimpleRecipeCard.jsx';

const PopularRecipes = () => {
  const { popularRecipes, getPopularRecipes, isPopularRecipesLoading } =
    useRecipe();

  useEffect(() => {
    getPopularRecipes();
  }, []);

  if (isPopularRecipesLoading) return <Loader fullScreen />;

  return (
    <div className={styles.popularProducts}>
      <Container>
        <Typography variant="h3">Popular recipes</Typography>

        <div className={styles.popularList}>
          {popularRecipes.map((recipe) => (
            <SimpleRecipeCard size="large" key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PopularRecipes;
