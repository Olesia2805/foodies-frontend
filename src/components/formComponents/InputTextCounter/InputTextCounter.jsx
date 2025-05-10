import css from './InputTextCounter.module.css';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';

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
    value.length > 0 && css['counter-current'],
    value.length > maxInputLenght && css['counter-error']
  );
  const wrapperClassName = clsx(
    css['input-wrapper'],
    className,
    error && css.error
  );
  const inputProps = {
    name: name,
    value: value,
    type: 'text',
    placeholder: placeholder,
    onChange: onChange,
    className: css.input,
    onBlur: onBlur,
    ref: ref,
    'aria-labelledby': name,
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
