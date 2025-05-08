import React from 'react';
import css from './ErrorMessage.module.css';
import clsx from 'clsx';

export default function ErrorMessage({ children }) {
  const errorClassName = clsx(css.errorMessage, children && css.visiable);
  return <p className={errorClassName}>{children}</p>;
}
