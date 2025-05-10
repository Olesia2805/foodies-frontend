import css from './InputTimeCounter.module.css';
import Icon from '../../Icon/Icon';
import { minToDays } from '../../../tools/minToDays';
import clsx from 'clsx';

export default function InputTimeCounter({ value, onChange, error }) {
  const updateValue = (income) => {
    const newValue = value + income;
    onChange(newValue > 0 ? newValue : 0);
  };

  const getValueToChange = (isDescrease) => {
    if (isDescrease && value <= 5) return 1;
    else if (value < 5) return 1;

    if (isDescrease && value <= 60) return 5;
    if (value < 60) return 5;

    if (value < 60 * 8) return 15;
    if (value < 60 * 16) return 30;
    return 60;
  };

  const decrease = () => updateValue(getValueToChange(true) * -1);
  const increase = () => updateValue(getValueToChange());

  let time = '';

  if (value > 0) {
    const { d, h, min } = minToDays(value);
    const days = String(d);
    const hours = String(h);
    const minutes = String(min);
    if (d)
      time = `${d} d, ${hours.padStart(2, 0)} h, ${minutes.padStart(2, 0)} min`;
    else if (h) time = `${hours} h, ${minutes.padStart(2, 0)} min`;
    else if (min) time = `${minutes} min`;
  } else {
    time = '0 min';
  }

  const valueClassName = clsx(css.value, error && css.error);

  return (
    <div className={css.wrapper}>
      <button
        type="button"
        onClick={decrease}
        className={css.button}
        aria-label="Decrease time"
      >
        <Icon name="minus" size={16} />
      </button>
      <p className={valueClassName}>{time.trim()}</p>
      <button
        type="button"
        onClick={increase}
        className={css.button}
        aria-label="Increase time"
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
