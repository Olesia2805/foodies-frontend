import React, { useEffect, useState } from 'react';
import PhotoUploader from '../formComponents/PhotoUploader/PhotoUploader';
import css from './AddRecipeForm.module.css';
import { useForm } from 'react-hook-form';
import InputTitle from '../formComponents/InputTitle/InputTitle';
import InputTextCounter from '../formComponents/InputTextCounter/InputTextCounter';
import Dropdown from '../Dropdown/Dropdown';
import InputTimeCounter from '../formComponents/InputTimeCounter/InputTimeCounter';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Fieldset from '../formComponents/Fieldset/Fieldset';
import FormTitle from '../formComponents/FormTitle/FormTitle';
import clsx from 'clsx';

export default function AddRecipeForm() {
  const { register, handleSubmit, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      photo: '', // thumb
      title: '',
      description: '',
      category: '',
      area: '', // ???
      'ingredient-quantity': '',
      preparation: '', // instructions
    },
    // resolver: yupResolver(SignUpSchema),
  });

  const [ingredients, setIngredients] = useState([]);

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

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
          <InputTextCounter
            name="description"
            control={control}
            placeholder="Enter a description of the dish"
          />
          {/* <InputTextCounter {...register('desc', { required: true })} /> */}
        </Fieldset>

        <div className={css['media-wrapper-row']}>
          <Fieldset>
            <FormTitle>Category</FormTitle>
            <Dropdown
              options={categoryOptions}
              className={css.dropdown}
              name="category"
            />
          </Fieldset>

          <Fieldset>
            <FormTitle>Cooking time</FormTitle>
            <InputTimeCounter />
          </Fieldset>
        </div>

        <Fieldset className={css['fieldset-ingredients']}>
          <FormTitle>Add Ingredients</FormTitle>
          <div className={css['media-wrapper-row-ingredient']}>
            <Dropdown
              options={categoryOptions}
              className={clsx(
                css['ingredients-margin-bottom-dropdown'],
                css.dropdown
              )}
            />
            <InputTextCounter
              name="ingredient-quantity"
              control={control}
              isCounter={false}
              isOneRow={true}
              className={css['ingredients-margin-bottom-input']}
              placeholder="Enter quantity"
            />
            {/* <InputTextCounter
              isCounter={false}
              isOneRow={true}
              className={css['ingredients-margin-bottom-input']}
            /> */}
          </div>
          <Button text="Add ingredient" variant="outline" />

          <ul>
            {ingredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.name}</li>;
            })}
          </ul>
        </Fieldset>

        <Fieldset>
          <FormTitle>Recipe Preparation</FormTitle>
          <InputTextCounter
            name="instructions"
            control={control}
            className={css['margin-preparation']}
            placeholder="Enter recipe"
            // {...register('preparation', { required: true })}
          />
        </Fieldset>

        <div className={css['btn-container']}>
          <button className={css['btn-delete']}>
            <Icon name="trash" size={20} />
          </button>
          <Button text={'Publish'} type="submit" />
        </div>
      </div>
      {/* <input  /> */}
    </form>
  );
}
