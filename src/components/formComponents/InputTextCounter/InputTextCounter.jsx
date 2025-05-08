import React, { useEffect } from 'react';
import css from './InputTextCounter.module.css';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';
import { useController } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function InputTextCounter({
  name = 'inputField',
  onChange,
  placeholder = 'text',
  isCounter = true,
  isOneRow = false,
  isTouched,
  isDirty,
  className,
  error,
  invalid,
  onBlur,
  value,
  ref,
  maxInputLenght = 200,
  ...otherProps
}) {
  const valueLength = value.length;
  const classNameCounter = clsx(
    maxInputLenght > 0 && css['counter-current'],
    invalid && css['counter-error']
  );
  const wrapperClassName = clsx(css['input-wrapper'], className);
  const inputProps = {
    name: name,
    value: value,
    type: 'text',
    placeholder: placeholder,
    onChange: onChange,
    className: css.input,
    onBlur: onBlur,
    ref: ref,
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
        <p className={clsx(css.counter, invalid && css['counter-error'])}>
          <span className={classNameCounter}>{valueLength}</span>/
          <span className={css['counter-max']}>{maxInputLenght}</span>
        </p>
      )}
    </label>
  );
}
