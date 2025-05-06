import React, { useState } from 'react';
import PhotoUploader from '../PhotoUploader/PhotoUploader';
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

export default function AddRecipeForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      photo: '',
      title: '',
      desc: '',
    },
    // resolver: yupResolver(SignUpSchema),
  });

  const [ingredients, setIngredients] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };
  const categoryOptions = [
    { value: 'seafood', label: 'Seafood' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'italian', label: 'Italian' },
  ];

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css['column-1']}>
        <PhotoUploader {...register('photo', { required: true })} />
      </div>

      <div className={css['column-2']}>
        <Fieldset>
          <InputTitle {...register('title', { required: true })} />
          <InputTextCounter {...register('desc', { required: true })} />
        </Fieldset>

        <Fieldset>
          <FormTitle>Category</FormTitle>
          <Dropdown options={categoryOptions} />
        </Fieldset>

        <Fieldset>
          <FormTitle>Cooking time</FormTitle>
          <InputTimeCounter />
        </Fieldset>

        <Fieldset>
          <FormTitle>Add Ingredients</FormTitle>
          <Dropdown
            options={categoryOptions}
            className={css['ingredients-margin-bottom-dropdown']}
          />
          <InputTextCounter
            isCounter={false}
            className={css['ingredients-margin-bottom-input']}
          />
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
            className={css['margin-preparation']}
            {...register('preparation', { required: true })}
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
