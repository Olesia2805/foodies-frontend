import React from 'react';
import css from './InputTextCounter.module.css';
import clsx from 'clsx';

export default function InputTextCounter({
  value = '',
  placeholder = 'Enter a description of the dish',
  onInput = (e) => console.log(e),
  ...otherProps
}) {
  const valueLength = value.length;
  const maxLength = 200;

  const classNameCounter = clsx(maxLength > 0 && css['counter-current']);
  return (
    <label className={css['input-wrapper']}>
      <input
        type="text"
        // value={value}
        placeholder={placeholder}
        onInput={onInput}
        className={css.input}
        {...otherProps}
      />
      <p className={css.counter}>
        <span className={classNameCounter}>{valueLength}</span>/
        <span className={css['counter-max']}>{maxLength}</span>
      </p>
    </label>
  );
}
