import React, { useEffect, useState } from 'react';
import PhotoUploader from '../formComponents/PhotoUploader/PhotoUploader';
import css from './AddRecipeForm.module.css';
import { Controller, useForm } from 'react-hook-form';
import InputTitle from '../formComponents/InputTitle/InputTitle';
import InputTextCounter from '../formComponents/InputTextCounter/InputTextCounter';
import Dropdown from '../Dropdown/Dropdown';
import InputTimeCounter from '../formComponents/InputTimeCounter/InputTimeCounter';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Fieldset from '../formComponents/Fieldset/Fieldset';
import FormTitle from '../formComponents/FormTitle/FormTitle';
import clsx from 'clsx';
import ingredientsAPI from '../../api/ingredientsAPI';
import InputIngredients from '../formComponents/InputIngredients/InputIngredients';
import DropdownSearch from '../formComponents/DropdownSearch/DropdownSearch';

const minInputLength = 4;
const maxInputLenght = 200;

export default function AddRecipeForm() {
  const { register, handleSubmit, control, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      photo: '', // thumb
      title: '',
      description: '',
      category: '',
      time: 0,
      area: '', // ???
      'ingredient-quantity': '',
      preparation: '', // instructions
    },
    // resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  const categoryOptions = [
    {
      value: 'seafood',
      label: 'Seafood',
    },
    {
      value: 'lamb',
      label: 'Lamb',
    },
    {
      value: 'starter',
      label: 'Starter',
    },
    {
      value: 'chicken',
      label: 'Chicken',
    },
    {
      value: 'beef',
      label: 'Beef',
    },
    {
      value: 'dessert',
      label: 'Dessert',
    },
    {
      value: 'vegan',
      label: 'Vegan',
    },
    {
      value: 'pork',
      label: 'Pork',
    },
    {
      value: 'vegetarian',
      label: 'Vegetarian',
    },
    {
      value: 'miscellaneous',
      label: 'Miscellaneous',
    },
    {
      value: 'pasta',
      label: 'Pasta',
    },
    {
      value: 'breakfast',
      label: 'Breakfast',
    },
    {
      value: 'side',
      label: 'Side',
    },
    {
      value: 'goat',
      label: 'Goat',
    },
    {
      value: 'soup',
      label: 'Soup',
    },
  ];

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css['column-1']}>
        <PhotoUploader {...register('photo', { required: true })} />
      </div>

      <div className={css['column-2']}>
        <Fieldset>
          <InputTitle {...register('title', { required: true })} />
          <Controller
            control={control}
            name="description"
            rules={{
              required: true,
              maxLength: maxInputLenght,
              minLength: minInputLength,
            }}
            render={({
              field: { onChange, value, name, ref },
              fieldState: { invalid, isTouched, error, isDirty, onBlur },
            }) => (
              <InputTextCounter
                name={name}
                value={value}
                onChange={onChange}
                error={error}
                invalid={invalid}
                maxInputLenght={maxInputLenght}
                placeholder="Enter a description of the dish"
                isTouched={isTouched}
                isDirty={isDirty}
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
        </Fieldset>

        <div className={css['media-wrapper-row']}>
          <Fieldset>
            <FormTitle>Category</FormTitle>
            <Controller
              control={control}
              name="category"
              render={({ field: { value, name } }) => (
                <div className={css.dropdown}>
                  <DropdownSearch
                    onChange={(newValue) => setValue(name, newValue)}
                    value={value}
                    options={categoryOptions}
                    placeholder="Select a category"
                  />
                </div>
              )}
            />
          </Fieldset>

          <Fieldset>
            <FormTitle>Cooking time</FormTitle>
            <Controller
              control={control}
              name="time"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => <InputTimeCounter onChange={onChange} value={value} />}
            />
          </Fieldset>
        </div>

        <div className={css['media-wrapper-row']}>
          <Fieldset>
            <FormTitle>Area</FormTitle>
            <Controller
              control={control}
              name="area"
              render={({ field: { value, name } }) => (
                <div className={css.dropdown}>
                  <DropdownSearch
                    onChange={(newValue) => setValue(name, newValue)}
                    value={value}
                    options={categoryOptions}
                    placeholder="Select an area"
                  />
                </div>
              )}
            />
          </Fieldset>
        </div>

        <InputIngredients />

        <Fieldset>
          <FormTitle>Recipe Preparation</FormTitle>
          <Controller
            control={control}
            name="preparation"
            rules={{
              required: true,
              maxLength: maxInputLenght,
              minLength: minInputLength,
            }}
            render={({
              field: { onChange, value, name, ref },
              fieldState: { invalid, isTouched, error, isDirty, onBlur },
            }) => (
              <InputTextCounter
                name={name}
                value={value}
                onChange={onChange}
                error={error}
                invalid={invalid}
                maxInputLenght={maxInputLenght}
                placeholder="Enter recipe"
                isTouched={isTouched}
                isDirty={isDirty}
                className={css['margin-preparation']}
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
        </Fieldset>

        <div className={css['btn-container']}>
          <button className={css['btn-delete']}>
            <Icon name="trash" size={20} />
          </button>
          <Button type="submit">Publish</Button>
        </div>
      </div>
      {/* <input  /> */}
    </form>
  );
}
