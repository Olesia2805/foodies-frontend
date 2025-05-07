import { useEffect, useRef } from 'react';
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
  selectSelectedIngredients,
  selectSelectedArea,
} from '../../redux/common/index.js';
import { getIngredients, getAreas } from '../../redux/common/index.js';
import { setSelectedIngredients, setSelectedArea } from '../../redux/common/slice';

const RecipeFilters = () => {
  const isCommonLoading = useSelector(selectIsCommonLoading);
  const error = useSelector(selectCommonError);
  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);
  const selectedArea = useSelector(selectSelectedArea);
  const selectedIngredients = useSelector(selectSelectedIngredients);

  const fetchedRef = useRef({
    ingredients: false,
    areas: false
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isCommonLoading && !ingredients?.length && !fetchedRef.current.ingredients) {
      fetchedRef.current.ingredients = true;
      dispatch(getIngredients());
    }

    if (!isCommonLoading && !areas?.length && !fetchedRef.current.areas) {
      fetchedRef.current.areas = true;
      dispatch(getAreas());
    }
  }, [dispatch, ingredients, areas, isCommonLoading]);

  const clearIngredients = () => {
    dispatch(setSelectedIngredients([]));
  };

  const clearArea = () => {
    dispatch(setSelectedArea(null));
  };

  useShowError(error);

  return (
    <div className={css.filtersContainer}>
      {!isCommonLoading && !!ingredients?.length && (
        <div className={css.dropdownWithClear}>
          <Dropdown
            items={ingredients}
            label="Ingredients"
            selectedValue={selectedIngredients}
            callback={setSelectedIngredients}
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
            callback={setSelectedArea}
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

      {/* Відображаємо заглушки, якщо дані не завантажені */}
      {(!ingredients?.length || !areas?.length) && (
        <>
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