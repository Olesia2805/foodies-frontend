import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import Nav from '../../components/Nav/Nav';
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

  return (
    <Container>
      <section className={styles.recipeSection}>
        <div className={styles.imageWrapper}>
          <img src={recipe.thumb} alt={recipe.title} className={styles.image} />
        </div>

        <div className={styles.recipeContent}>
          <h1>{recipe.title}</h1>
        </div>

        <div className={styles.tags}>
          <span className={styles.tag}>{recipe.categoryOfRecipe.name}</span>
          <span className={styles.tag}>{recipe.time} min</span>
        </div>

        <p className={styles.description}>{recipe.description}</p>

        <div className={styles.author}>
          <img src={recipe.owner.avatar} alt="NA" />
          <span>
            Created by: <strong>{recipe.owner.name}</strong>
          </span>
        </div>

        {/* Ingredients */}
        <section className={styles.ingredients}>
          <h2>Ingredients</h2>
          <ul className={styles.ingredientList}>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <img src={ingredient.img} alt={ingredient.name} />
                {ingredient.name}
                <span>{ingredient.recipe_ingredient.measure}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Preparation */}
        <section className={styles.preparation}>
          <h2>Recipe Preparation</h2>
          <p>{recipe.instructions}</p>
        </section>

        <button className={styles.favoriteButton}>Add to favorites</button>
      </section>
    </Container>
  );
};

export default RecipePage;
