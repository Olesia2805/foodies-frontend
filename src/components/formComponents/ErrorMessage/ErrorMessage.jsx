import css from './ErrorMessage.module.css';
import clsx from 'clsx';
import Icon from '../../Icon/Icon';

export default function ErrorMessage({ children }) {
  const errorClassName = clsx(css.errorMessage, children && css.visiable);
  return (
    <p className={errorClassName}>
      {children && <Icon name="error" className={css['icon-error']} />}
      <span className={css['errorMessageText']}>{children}</span>
    </p>
  );
}
