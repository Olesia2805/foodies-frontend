import React, { useState } from 'react';
import css from './InputTimeCounter.module.css';
import Icon from '../../Icon/Icon';

export default function InputTimeCounter() {
  const [value, setValue] = useState(10);

  const updateValue = (income) => {
    const newValue = value + income;
    setValue(newValue > 0 ? newValue : 0);
  };

  const increase = () => updateValue(-5);
  const decrease = () => updateValue(5);

  return (
    <div className={css.wrapper}>
      <button type="button" onClick={increase} className={css.button}>
        <Icon name="minus" size={16} />
      </button>
      <p className={css.value}>{value} min</p>
      <button type="button" onClick={decrease} className={css.button}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
