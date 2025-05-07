import React, { useEffect } from 'react';
import css from './InputTextCounter.module.css';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';
import { useController } from 'react-hook-form';

export default function InputTextCounter({
  name: propName = 'inputField',
  control,
  placeholder = 'Enter a description of the dish',
  isCounter = true,
  isOneRow = false,
  className,

  ...otherProps
}) {
  const maxLength = 200;

  const {
    field: { onChange, onBlur, name, value = '', ref },
    formState,
  } = useController({
    name: propName,
    control,
    rules: { required: true, maxLength: maxLength },
  });

  const error = formState.errors[name];

  const valueLength = value.length;
  // console.log(errors);
  // useEffect(() => {
  //   console.log(error);
  // }, [error]);

  // const classNameInput = clsx(css['input'], !isCounter && css['input-full-width']);
  const classNameCounter = clsx(
    maxLength > 0 && css['counter-current'],
    error && css['counter-error']
  );
  const wrapperClassName = clsx(css['input-wrapper'], className);

  const inputProps = {
    name: name,
    value: value,
    type: 'text',
    placeholder: placeholder,
    onChange: onChange,
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
        <p className={clsx(css.counter, error && css['counter-error'])}>
          <span className={classNameCounter}>{valueLength}</span>/
          <span className={css['counter-max']}>{maxLength}</span>
        </p>
      )}
    </label>
  );
}
