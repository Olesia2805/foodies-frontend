import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import { fetchRecipeById } from '../../redux/recipes/operations';
import { selectRecipeById } from '../../redux/recipes/selectors';
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
  if (!recipe || !recipe._id) return <div>Recipe not found</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className={styles['recipe-page']}>
      <div className={styles['recipe-image']}>
        <img src={recipe.thumb} alt={recipe.title} />
      </div>
      <h1>{recipe?.title}</h1>

      <ul className={styles['recipe-category']}>
        <li>{recipe?.categoryOfRecipe.name}</li>
        <li>{recipe.time} min</li>
      </ul>

      <p>{recipe.description}</p>

      <div className={styles['recipe-author-block']}>
        <img
          className={styles['recipe-author-img']}
          src={recipe?.owner.avatar}
          alt="NA"
        />
        <ul>
          <li className={styles['recipe-author-span']}>Created by </li>
          <li className="recipe-author-name">{recipe?.owner.name} </li>
        </ul>
      </div>

      <div className={styles['recipe-content']}>
        <h2>Ingredients</h2>
        <ul className={styles['ingredients-list']}>
          {recipe.ingredients.map((ingredient, index) => (
            <li className={styles['ingredient-item']} key={index}>
              <img
                className={styles['ingredient-image']}
                src={ingredient.img}
                alt="NA"
              />
              <div>
                <p className={styles['ingredient-name']}>{ingredient.name}</p>
                <p className={styles['ingredient-measure']}>
                  {ingredient.RecipeIngredient.measure}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <h2>Recipe Preparation</h2>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipePage;
