import React from 'react';
import PhotoUploader from '../PhotoUploader/PhotoUploader';
import css from './AddRecipeForm.module.css';
import { useForm } from 'react-hook-form';
import InputTitle from '../formComponents/InputTitle/InputTitle';
import InputTextCounter from '../formComponents/InputTextCounter/InputTextCounter';

export default function AddRecipeForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      photo: '',
      title: '',
      desc: '',
    },
    // resolver: yupResolver(SignUpSchema),
  });
  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };
  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css['column-1']}>
        <PhotoUploader {...register('photo', { required: true })} />
      </div>

      <div className={css['column-2']}>
        <InputTitle {...register('title', { required: true })} />
        <InputTextCounter {...register('desc', { required: true })} />
      </div>
      {/* <input type="submit" /> */}
    </form>
  );
}
