import css from './InputTimeCounter.module.css';
import Icon from '../../Icon/Icon';
import { minToDays } from '../../../tools/minToDays';

export default function InputTimeCounter({ value, onChange }) {
  const updateValue = (income) => {
    const newValue = value + income;
    onChange(newValue > 0 ? newValue : 0);
  };

  const decrease = () => updateValue(-5);
  const increase = () => updateValue(5);

  let time = '';
  if (value > 0) {
    const remainingTime = minToDays(value);
    time = Object.keys(remainingTime)
      .reduce((acc, value) => {
        if (remainingTime[value] > 0)
          acc.push(`${remainingTime[value]} ${value}`);
        return acc;
      }, [])
      .join(', ');
  } else {
    time = '0 min';
  }

  return (
    <div className={css.wrapper}>
      <button type="button" onClick={decrease} className={css.button}>
        <Icon name="minus" size={16} />
      </button>
      <p className={css.value}>{time.trim()}</p>
      <button type="button" onClick={increase} className={css.button}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
