import css from './Fieldset.module.css';
import clsx from 'clsx';

export default function Fieldset({ children, className }) {
  const fieldsetClassName = clsx(css.fieldsset, className);
  return <fieldset className={fieldsetClassName}>{children}</fieldset>;
}
