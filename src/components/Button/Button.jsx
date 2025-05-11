import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';
import Loader from '../Loader/Loader.jsx';

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
  customClassName,
  ...props
}) => {
  const customStyle = {
    width: width || 'auto',
    ...style,
  };

  const variantClassMap = {
    contained: styles.buttonContained,
    outlined: styles.buttonOutlined,
    logoutOrFollowBtn: styles.logoutOrFollowBtn,
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
        props.className,
        customClassName
      )}
      style={{
        ...customStyle,
        width: fullWidth ? '100%' : customStyle.width,
      }}
      disabled={disabled}
      {...props}
    >
      {loading ? <Loader size="small" /> : children}
    </button>
  );
};

export default Button;
