import React from 'react';
import css from './InputTitle.module.css';
import TextareaAutosize from 'react-textarea-autosize';

export default function InputTitle({
  value,
  placeholder = 'The name of the recipe',
  ...otherProps
}) {
  return (
    <TextareaAutosize
      className={css.title}
      type="text"
      placeholder={placeholder}
      {...otherProps}
    >
      {value}
    </TextareaAutosize>
  );
}
