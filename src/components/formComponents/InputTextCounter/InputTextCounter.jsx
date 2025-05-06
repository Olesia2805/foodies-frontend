import React from 'react';
import css from './InputTextCounter.module.css';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';

export default function InputTextCounter({
  value = '',
  placeholder = 'Enter a description of the dish',
  onInput = (e) => console.log(e),
  isCounter = true,
  isOneRow = false,
  className,
  ...otherProps
}) {
  const valueLength = value.length;
  const maxLength = 200;

  // const classNameInput = clsx(css['input'], !isCounter && css['input-full-width']);
  const classNameCounter = clsx(maxLength > 0 && css['counter-current']);
  const wrapperClassName = clsx(css['input-wrapper'], className);

  const inputProps = {
    type: 'text',
    placeholder: placeholder,
    onInput: onInput,
    className: css.input,
    ...otherProps,
  };

  return (
    <label className={wrapperClassName}>
      {isOneRow ? (
        <input {...inputProps} />
      ) : (
        <TextareaAutosize {...inputProps}></TextareaAutosize>
      )}
      {isCounter && (
        <p className={css.counter}>
          <span className={classNameCounter}>{valueLength}</span>/
          <span className={css['counter-max']}>{maxLength}</span>
        </p>
      )}
    </label>
  );
}
