import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import css from './RecipeFilters.module.css';
import Dropdown from '../Dropdown/Dropdown';
import Icon from '../Icon/Icon';
import { useShowError } from '../../hooks/useShowError';
import {
  selectCommonError,
  selectIsCommonLoading,
  selectIngredients,
  selectAreas,
  selectCategories,
  selectSelectedIngredients,
  selectSelectedArea,
  selectSelectedCategory,
} from '../../redux/common/index.js';
import {
  getIngredients,
  getAreas,
  getCategories,
} from '../../redux/common/index.js';
import {
  setSelectedIngredients,
  setSelectedArea,
  setSelectedCategory,
} from '../../redux/common/slice';

const RecipeFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isCommonLoading = useSelector(selectIsCommonLoading);
  const error = useSelector(selectCommonError);
  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const selectedArea = useSelector(selectSelectedArea);
  const selectedIngredients = useSelector(selectSelectedIngredients);

  const fetchedRef = useRef({
    ingredients: false,
    areas: false,
    categories: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !isCommonLoading &&
      !ingredients?.length &&
      !fetchedRef.current.ingredients
    ) {
      fetchedRef.current.ingredients = true;
      dispatch(getIngredients());
    }

    if (!isCommonLoading && !areas?.length && !fetchedRef.current.areas) {
      fetchedRef.current.areas = true;
      dispatch(getAreas());
    }

    if (
      !isCommonLoading &&
      !categories?.length &&
      !fetchedRef.current.categories
    ) {
      fetchedRef.current.categories = true;
      dispatch(getCategories());
    }
  }, [dispatch, ingredients, areas, categories, isCommonLoading]);

  const clearIngredients = () => {
    dispatch(setSelectedIngredients([]));
  };

  const clearArea = () => {
    dispatch(setSelectedArea(null));
  };

  const clearCategory = () => {
    dispatch(setSelectedCategory(null));

    searchParams.set('categoryId', 'all');
    setSearchParams(searchParams);
  };

  const isCategorySelected = selectedCategory && selectedCategory.id !== 'all';

  useShowError(error);

  return (
    <div className={css.filtersContainer}>
      {!isCommonLoading && !!categories?.length && (
        <div className={css.dropdownWithClear}>
          <Dropdown
            items={categories}
            label="Category"
            selectedValue={isCategorySelected ? selectedCategory : null}
            callback={(values) => {
              searchParams.set('categoryId', values.id);
              setSearchParams(searchParams);

              dispatch(setSelectedCategory(values));
            }}
          />
          {isCategorySelected && (
            <button
              onClick={clearCategory}
              className={css.clearButton}
              title="Clear category"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>
      )}

      {!isCommonLoading && !!ingredients?.length && (
        <div className={css.dropdownWithClear}>
          <Dropdown
            items={ingredients}
            label="Ingredients"
            selectedValue={selectedIngredients}
            callback={(values) => dispatch(setSelectedIngredients(values))}
            isMulti={true}
          />
          {selectedIngredients?.length > 0 && (
            <button
              onClick={clearIngredients}
              className={css.clearButton}
              title="Clear ingredients"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>
      )}

      {!isCommonLoading && !!areas?.length && (
        <div className={css.dropdownWithClear}>
          <Dropdown
            items={areas}
            label="Area"
            selectedValue={selectedArea}
            callback={(values) => dispatch(setSelectedArea(values))}
          />
          {selectedArea && (
            <button
              onClick={clearArea}
              className={css.clearButton}
              title="Clear area"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>
      )}

      {(!categories?.length || !ingredients?.length || !areas?.length) && (
        <>
          {!categories?.length && (
            <div className={css.dropdownPlaceholder}>Category</div>
          )}
          {!ingredients?.length && (
            <div className={css.dropdownPlaceholder}>Ingredients</div>
          )}
          {!areas?.length && (
            <div className={css.dropdownPlaceholder}>Area</div>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeFilters;
