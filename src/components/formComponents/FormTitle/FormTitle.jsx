import React from 'react';
import css from './FormTitle.module.css';

export default function FormTitle({ children }) {
  return <p className={css.title}>{children}</p>;
}
