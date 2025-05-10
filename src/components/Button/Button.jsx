import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';
import Loader from '../Loader/Loader.jsx';

const Button = ({
  children,
  variant = 'primary',
  width,
  // height,
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
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    outlined: styles.buttonOutlined,
    logoutOrFollowBtn: styles.logoutOrFollowBtn,
  };

  return (
    <button
      className={clsx(styles.button, variantClassMap[variant], props.className)}
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
