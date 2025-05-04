import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../../redux/recipes/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecipeById } from '../../redux/recipes/selectors';
import { Loader } from '../../components/Loader/Loader';
import { Error } from '../../components/Error/Error';
import styles from './RecipePage.module.css';

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(selectRecipeById(id));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        await dispatch(fetchRecipeById(id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id, dispatch]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className={styles['recipe-page']}>
      <div className={styles['recipe-header']}>
        <h1>{recipe.title}</h1>
        <div className={styles['recipe-meta']}>
          <span className="author">By {recipe.author}</span>
          <span className="date">{new Date(recipe.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className={styles['recipe-content']}>
        <div className={styles['recipe-image']}>
          <img src={recipe.image} alt={recipe.title} />
        </div>

        <div className={styles['recipe-details']}>
          <h2>Ingredients</h2>
          <ul className={styles['ingredients-list']}>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h2>Instructions</h2>
          <ol className={styles['instructions-list']}>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <div className={styles['recipe-info']}>
            <div className="prep-time">Prep Time: {recipe.prepTime} mins</div>
            <div className="cook-time">Cook Time: {recipe.cookTime} mins</div>
            <div className="servings">Servings: {recipe.servings}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
