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

export default function InputIngredients({ onChange }) {
  const [firstRender, setFirstRender] = useState(true); // measure
  const dispatch = useDispatch();

  // Store Ingredients
  const isIngredientsLoading = useSelector(selectIngredientsIsLoading);
  const isIngredientsError = useSelector(selectIngredientsError);
  const allIngredients = useSelector(selectIngredients);

  const [selectedIngredient, setSelectedIngredient] = useState(null); // option
  const [quantity, setQuantity] = useState(''); // measure

  const [ingredients, setIngredients] = useState([]);

  const dropdownOptions = useMemo(() => {
    return allIngredients.map((item) => {
      return {
        value: item._id,
        label: item.name,
        disabled: Boolean(ingredients.find(({ id }) => id === item._id)),
      };
    });
  }, [allIngredients, ingredients]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (firstRender) return setFirstRender(false); // prevent validation
    onChange(ingredients);
  }, [onChange, ingredients]);

  const quantityOnChange = (event) => {
    let { value } = event.target;
    if (value.length > 30) value = value.substring(0, 30);
    setQuantity(value);
  };

  const onSelectChange = (selectedValue) => {
    // console.log(selectedValue);
    setSelectedIngredient(selectedValue);
  };

  const onClick = () => {
    if (selectedIngredient && quantity.length > 1) {
      setIngredients((prevState) => {
        return [...prevState, { id: selectedIngredient.value, quantity }];
      });
      setSelectedIngredient(null);
      setQuantity('');
    }
  };

  const onDeleteClick = (id, event) => {
    setIngredients((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
  };

  const ingredientsToRender = useMemo(() => {
    return ingredients.map(({ id, quantity }) => {
      const originalIngredient = allIngredients.find((item) => item._id === id);
      return {
        ...originalIngredient,
        recipe_ingredient: { measure: quantity },
      };
    });
  }, [allIngredients, ingredients]);

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
        />

        <InputTextCounter
          name="ingredient-quantity"
          isCounter={false}
          isOneRow={true}
          className={css['ingredients-margin-bottom-input']}
          placeholder="Enter quantity"
          value={quantity}
          onChange={quantityOnChange}
        />
      </div>
      <Button variant="outline" type="button" onClick={onClick}>
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
