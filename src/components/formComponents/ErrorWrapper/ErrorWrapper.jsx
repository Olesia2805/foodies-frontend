import React from 'react';
import css from './ErrorWrapper.module.css';
import clsx from 'clsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function ErrorWrapper({
  errorMessage = '',
  children,
  isShadow = true,
}) {
  const wrapperClassName = clsx(
    css['error-wrapper'],
    errorMessage && isShadow && css['visiable']
  );
  return (
    <div className={wrapperClassName}>
      {children}

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
