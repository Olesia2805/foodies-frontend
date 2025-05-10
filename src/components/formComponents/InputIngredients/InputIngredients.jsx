import React, { useEffect, useMemo, useState } from 'react';
import InputTextCounter from '../InputTextCounter/InputTextCounter';
import Button from '../../Button/Button';
import css from './InputIngredients.module.css';
import Fieldset from '../Fieldset/Fieldset';
import FormTitle from '../FormTitle/FormTitle';
import Icon from '../../Icon/Icon';
import DropdownSearch from '../DropdownSearch/DropdownSearch';
import { fetchIngredients } from '../../../redux/ingredients/operations';
import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsIsLoading,
} from '../../../redux/ingredients/selectors';
import { useDispatch, useSelector } from 'react-redux';
import IngredientsList from '../../IngredientsList/IngredientsList';

export default function InputIngredients({
  onChange,
  error,
  value,
  resetTrigger,
}) {
  const dispatch = useDispatch();

  // Store Ingredients
  const isIngredientsLoading = useSelector(selectIngredientsIsLoading);
  const isIngredientsError = useSelector(selectIngredientsError);
  const allIngredients = useSelector(selectIngredients);

  const [selectedIngredient, setSelectedIngredient] = useState(null); // option
  const [quantity, setQuantity] = useState(''); // measure

  const dropdownOptions = useMemo(() => {
    return allIngredients.map((item) => {
      return {
        value: item._id,
        label: item.name,
        disabled: Boolean(value.find(({ id }) => id === item._id)),
      };
    });
  }, [allIngredients, value]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (typeof resetTrigger === 'boolean') {
      setSelectedIngredient(null);
      setQuantity('');
    }
  }, [resetTrigger]);

  const quantityOnChange = (event) => {
    let value = event.target.value.trim();
    if (value.length > 30) value = value.substring(0, 30);
    setQuantity(value);
  };

  const onSelectChange = (selectedValue) => {
    setSelectedIngredient(selectedValue);
  };

  const onClick = () => {
    if (selectedIngredient && quantity.length > 0) {
      onChange([...value, { id: selectedIngredient.value, quantity }]);
      setSelectedIngredient(null);
      setQuantity('');
    }
  };

  const onDeleteClick = (id) => {
    onChange(value.filter((item) => item.id !== id));
  };

  const ingredientsToRender = useMemo(() => {
    return value.map(({ id, quantity }) => {
      const originalIngredient = allIngredients.find((item) => item._id === id);
      return {
        ...originalIngredient,
        recipe_ingredient: { measure: quantity },
      };
    });
  }, [allIngredients, value]);

  return (
    <Fieldset className={css['fieldset-ingredients']}>
      <FormTitle>Add Ingredients</FormTitle>
      <div className={css['media-wrapper-row-ingredient']}>
        <DropdownSearch
          onChange={onSelectChange}
          value={selectedIngredient}
          options={dropdownOptions}
          placeholder="Select placeholder"
          isDisabled={isIngredientsError && isIngredientsLoading}
          error={!Boolean(selectedIngredient) && error}
        />

        <InputTextCounter
          name="ingredient-quantity"
          isCounter={false}
          isOneRow={true}
          className={css['ingredients-margin-bottom-input']}
          placeholder="Enter quantity"
          value={quantity}
          onChange={quantityOnChange}
          error={quantity.length === 0 && error}
        />
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={onClick}
        customClassName={error && css.error}
      >
        Add ingredient
        <Icon name="plus" />
      </Button>

      <div className={css['ingredients-list-wrapper']}>
        <IngredientsList
          ingredients={ingredientsToRender}
          isPageAddRecipe
          onDeleteClick={onDeleteClick}
        />
      </div>
    </Fieldset>
  );
}
