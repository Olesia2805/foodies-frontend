import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Recipes.module.css';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from '../RecipePagination/RecipePagination';
import {
  selectSelectedCategory,
  selectSelectedArea,
  selectSelectedIngredients,
} from '../../redux/common/index.js';
import {
  setSelectedCategory,
  setSelectedIngredients,
  setSelectedArea,
} from '../../redux/common/slice.js';
import { clearRecipes, setPage } from '../../redux/recipes/slice';
import {
  fetchRecipes,
  fetchFavoriteRecipes,
} from '../../redux/recipes/index.js';
import Icon from '../Icon/Icon';
import { selectIsAuthenticated } from '../../redux/auth/index.js';
import { useSearchParams } from 'react-router-dom';

const Recipes = ({ onBackClick }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);
  const selectedArea = useSelector(selectSelectedArea);
  const selectedIngredients = useSelector(selectSelectedIngredients);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const fetchExecutedRef = useRef(false);
  const lastFiltersRef = useRef({});

  const defaultTitle = 'ALL CATEGORIES';
  const defaultSubtitle =
    'Find your favorite dishes from our collection of the best recipes.';

  const recipesListRef = useRef(null);

  useEffect(() => {
    const categoryId = searchParams.get('categoryID');

    const params = {
      page: 1,
      categoryId:
        selectedCategory && selectedCategory._id !== 'all'
          ? selectedCategory._id
          : undefined,
      areaId: selectedArea?.value || null,
      ingredientId: selectedIngredients?.length
        ? selectedIngredients.map((ing) => ing.value).join(',')
        : null,
    };

    const filtersChanged =
      lastFiltersRef.current.categoryId !== params.categoryId ||
      lastFiltersRef.current.areaId !== params.areaId ||
      lastFiltersRef.current.ingredientId !== params.ingredientId;

    if (!fetchExecutedRef.current || filtersChanged) {
      lastFiltersRef.current = { ...params };
      dispatch(fetchRecipes(params));
      fetchExecutedRef.current = true;

      if (isAuthenticated) {
        dispatch(fetchFavoriteRecipes());
      }
    }
  }, [
    dispatch,
    selectedCategory,
    selectedArea,
    selectedIngredients,
    isAuthenticated,
  ]);

  const handleClick = () => {
    dispatch(setSelectedCategory(null));
    dispatch(setSelectedArea(null));
    dispatch(setSelectedIngredients([]));
    dispatch(setPage(1));
    dispatch(clearRecipes());

    fetchExecutedRef.current = false;

    if (onBackClick && typeof onBackClick === 'function') {
      onBackClick();
    }
  };

  const title =
    selectedCategory && selectedCategory.id !== 'all' && selectedCategory.name
      ? selectedCategory.name
      : defaultTitle;

  const subtitle =
    selectedCategory &&
    selectedCategory.id !== 'all' &&
    selectedCategory.description
      ? selectedCategory.description
      : defaultSubtitle;

  return (
    <section className={css.recipesMainContainer} ref={recipesListRef}>
      <div className={css.recipesTitleContainer}>
        <button
          className={css.backContainer}
          aria-label="Back Home"
          onClick={handleClick}
        >
          <Icon name="arrow-left" className={css.backIconContainer} />
          <span className={css.backText}>Back</span>
        </button>
        <MainTitle title={title} />
        <Subtitle subtitle={subtitle} />
      </div>
      <div className={css.recipesListFiltersContainer}>
        <RecipeFilters />
        <div className={css.recipesListContainer}>
          <RecipeList />
          <RecipePagination recipesListRef={recipesListRef} />
        </div>
      </div>
    </section>
  );
};

export default Recipes;
