import React, { useState } from 'react';
import css from './InputTimeCounter.module.css';
import Icon from '../../Icon/Icon';

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

// tools

function minToDays(min, ep = 1) {
  let days = Math.floor((min * ep) / 1440);
  let remainingTime = parseInt(min * ep - Math.floor(days * 1440));
  let hours = Math.floor(remainingTime / 60);
  let remainingMin = Math.floor(remainingTime - hours * 60);
  return { d: days, h: hours, min: remainingMin };
  return `${days} day(s) and ${hours} hour(s) and ${remainingMin} minutes(s).`;
}
