import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Error from '../../components/Error/Error';
import IngredientsList from '../../components/IngredientsList/IngredientsList';
import Loader from '../../components/Loader/Loader';
import RecipeImage from '../../components/RecipeImage/RecipeImage';
import { fetchRecipeById } from '../../redux/recipes/operations';
import { selectRecipeById } from '../../redux/recipes/selectors';
import styles from './RecipePage.module.css';

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(selectRecipeById(id));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Створюємо реф для секції
  const recipeSectionRef = useRef(null);

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

  useEffect(() => {
    // Скролимо до секції після завантаження
    if (!loading && !error && recipeSectionRef.current) {
      recipeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading, error]);

  if (loading)
    return (
      <Container>
        <Loader fullScreen={true} />
      </Container>
    );
  if (error) return <Error message={error} />;
  if (!recipe || !recipe._id)
    return (
      <Container>
        <Error message="Recipe not found" />
      </Container>
    );

  return (
    <Container>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Home', link: '/' }, { label: recipe.title }]}
      />
      <section className={styles.recipeSection}>
        <RecipeImage src={recipe.thumb} alt={recipe.title}></RecipeImage>

        <div className={styles.recipeContent}>
          <section className={styles.recipeHeader}>
            <h1>{recipe.title}</h1>

            <div className={styles.tags}>
              <span className={styles.tag}>{recipe.categoryOfRecipe.name}</span>
              <span className={styles.tag}>{recipe.time} min</span>
            </div>

            <p className={styles.description}>{recipe.description}</p>

            <div className={styles.author}>
              <img src={recipe.owner.avatar} alt="NA" />
              <span>
                Created by: <br />
                <strong className={styles.authorName}>
                  {recipe.owner.name}
                </strong>
              </span>
            </div>
          </section>

          {/* Ingredients */}
          <section className={styles.ingredients}>
            <h2>Ingredients</h2>
            <IngredientsList ingredients={recipe.ingredients} />
          </section>

          {/* Preparation */}
          <section className={styles.preparation}>
            <h2>Recipe Preparation</h2>
            <p className={styles.instructions}>{recipe.instructions}</p>
          </section>

          {/* TODO: Add to favorites */}
          <Button
            variant="outlined"
            onClick={() => console.log('Button "Add to favorites" clicked')}
          >
            Add to favorites
          </Button>
        </div>
      </section>
    </Container>
  );
};

export default RecipePage;
