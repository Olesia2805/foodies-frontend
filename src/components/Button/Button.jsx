import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';
import Loader from '../Loader/Loader.jsx';
import container from '../Container/Container.jsx';

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  width,
  height,
  style,
  disabled,
  fullWidth,
  loading,
  ...props
}) => {
  const customStyle = {
    width: width || 'auto',
    ...style,
  };

  const variantClassMap = {
    contained: styles.buttonContained,
    outlined: styles.buttonOutlined,
  };

  const colorClassMap = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
  };

  const sizeClassMap = {
    small: styles.buttonSmall,
  };

  return (
    <button
      className={clsx(
        styles.button,
        colorClassMap[color],
        variantClassMap[variant],
        sizeClassMap[size],
        props.className
      )}
      style={{
        ...customStyle,
        width: fullWidth ? '100%' : customStyle.width,
      }}
      disabled={disabled}
      {...props}
    >
      {/* TODO: Change Loader for button */}
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
