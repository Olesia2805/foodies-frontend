import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../../components/Container/Container';
import Hero from '../../components/Hero/Hero';
import Testimonials from '../../components/Testimonials/Testimonials';
import Recipes from '../../components/Recipes/Recipes';
import Categories from '../../components/Categories/Categories';

import {
  setSelectedCategory,
  setSelectedIngredients,
  setSelectedArea,
} from '../../redux/common/index.js';
import { clearRecipes, setPage } from '../../redux/recipes/index.js';
import { useSearchParams } from 'react-router-dom';
import { selectCategories } from '../../redux/categories/index.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const recipesRef = useRef(null);
  const categoriesRef = useRef(null);
  const categories = useSelector(selectCategories);

  const [searchParams, setSearchParams] = useSearchParams();

  const [showRecipes, setShowRecipes] = useState(false);

  useEffect(() => {
    const isRecipesList = Boolean(searchParams.get('recipesList'));
    const categoryId = searchParams.get('categoryId');

    setShowRecipes(isRecipesList);

    if (!isRecipesList) return;

    const category = categories.find(
      (category) => category._id === Number(categoryId)
    );

    if (category) {
      dispatch(setSelectedCategory(category));
    }
  }, [searchParams, categories]);

  const handleCategorySelect = (category) => {
    dispatch(clearRecipes());
    dispatch(setSelectedIngredients([]));
    dispatch(setSelectedArea(null));
    dispatch(setSelectedCategory(category));
    dispatch(setPage(1));

    searchParams.set('recipesList', true);
    searchParams.set('categoryId', category.id);
    setSearchParams(searchParams);

    setTimeout(() => {
      if (recipesRef.current) {
        recipesRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBackClick = () => {
    searchParams.delete('recipesList');
    searchParams.delete('categoryId');
    setSearchParams(searchParams);

    dispatch(setSelectedCategory(null));
    dispatch(clearRecipes());

    setTimeout(() => {
      if (categoriesRef.current) {
        categoriesRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <Hero />
      <Container>
        {showRecipes ? (
          <div ref={recipesRef}>
            <Recipes onBackClick={handleBackClick} />
          </div>
        ) : (
          <div ref={categoriesRef}>
            <Categories onCategorySelect={handleCategorySelect} />
          </div>
        )}
      </Container>

      <Testimonials />
    </>
  );
};

export default HomePage;
