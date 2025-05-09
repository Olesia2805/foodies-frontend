import css from './InputTimeCounter.module.css';
import Icon from '../../Icon/Icon';
import { minToDays } from '../../../tools/minToDays';

export default function InputTimeCounter({ value, onChange }) {
  const updateValue = (income) => {
    const newValue = value + income;
    onChange(newValue > 0 ? newValue : 0);
  };

  const getValueToChange = (isDescrease) => {
    if (isDescrease && value <= 5) return 1;
    else if (value < 5) return 1;
    if (value < 60) return 5;
    if (value < 60 * 8) return 15;
    if (value < 60 * 16) return 30;
    return 60;
  };

  const decrease = () => updateValue(getValueToChange(true) * -1);
  const increase = () => updateValue(getValueToChange());

  // let time = '';
  // if (value > 0) {
  //   const remainingTime = minToDays(value);
  //   time = Object.keys(remainingTime)
  //     .reduce((acc, value) => {
  //       if (remainingTime[value] > 0)
  //         acc.push(`${remainingTime[value]} ${value}`);
  //       return acc;
  //     }, [])
  //     .join(', ');
  // } else {
  //   time = '0 min';
  // }

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
