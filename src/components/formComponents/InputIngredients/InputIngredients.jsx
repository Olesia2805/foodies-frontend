import React from 'react';
import InputWithTitle from '../InputWithTitle/InputWithTitle';
import InputTextCounter from '../InputTextCounter/InputTextCounter';
import Dropdown from '../../Dropdown/Dropdown';
import Button from '../../Button/Button';
import css from './InputIngredients.module.css';

export default function InputIngredients() {
  const categoryOptions = [
    { value: 'seafood', label: 'Seafood' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'italian', label: 'Italian' },
  ];
  return (
    <InputWithTitle title={'Add Ingredients'}>
      <Dropdown
        options={categoryOptions}
        className={css['margin-bottom-dropdown']}
      />
      <InputTextCounter
        isCounter={false}
        className={css['margin-bottom-input']}
      />
      <Button text="Add ingredient" variant="outline" />
    </InputWithTitle>
  );
}
