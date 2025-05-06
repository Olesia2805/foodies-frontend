import { useDispatch, useSelector } from 'react-redux';
import css from './Recipes.module.css';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from '../RecipePagination/RecipePagination';
import { selectSelectedCategory } from '../../redux/common/index.js';
import { setSelectedCategory, setSelectedIngredients, setSelectedArea } from '../../redux/common/slice.js';
import { clearRecipes, setPage } from '../../redux/recipes/slice';
import Icon from '../Icon/Icon';

const Recipes = ({ onUserAvatarClick, onRecipeDetailsClick }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleClick = () => {
    dispatch(setSelectedCategory(null));
    dispatch(setSelectedArea(null));
    dispatch(setSelectedIngredients([]));
    dispatch(setPage(1));
    dispatch(clearRecipes());
  };

  return (
    <div className={css.recipesMainContainer}>
      <div className={css.recipesTitleContainer}>
        <button className={css.backContainer} aria-label="Back Home" onClick={handleClick}>
          <Icon name="arrow-left" className={css.backIconContainer} />
          <p>Back</p>
        </button>
        <MainTitle title={selectedCategory?.name} />
        <Subtitle subtitle={selectedCategory?.description} />
      </div>
      <div className={css.recipesListFiltersContainer}>
        <RecipeFilters />
        <div className={css.recipesListContainer}>
          <RecipeList
            onUserAvatarClick={onUserAvatarClick}
            onRecipeDetailsClick={onRecipeDetailsClick}
          />
          <RecipePagination />
        </div>
      </div>
    </div>
  );
};

export default Recipes;