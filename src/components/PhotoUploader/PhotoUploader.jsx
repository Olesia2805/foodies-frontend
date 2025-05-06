import React from 'react';

import css from './PhotoUploader.module.css';
import Icon from '../Icon/Icon';

export default function PhotoUploader({ image, onClick, ...otherProps }) {
  if (!image)
    return (
      <div className={css['photo-uploader']} onClick={onClick}>
        <Icon name={'upload_photo'} size={50} />
        <button className={css['btn-img-upload']}>Upload a photo</button>
      </div>
    );

  return (
    <>
      <div className={'photo-uploader-image'} onClick={onClick}>
        <img src={image} alt="Recipe Photo" />
      </div>

      <button className={css['btn-img-upload']}>Upload another photo</button>
    </>
  );
}
