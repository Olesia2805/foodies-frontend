import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../../components/RecipeCard/RecipeCard.jsx';
import styles from './RecipePage.module.css';

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/api/recipes/own');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className={styles.container}>
      <h1>My Recipes</h1>
      <div className={styles.recipeList}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
