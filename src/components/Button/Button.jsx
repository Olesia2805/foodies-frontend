import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary',
  width,
  height,
  style,
  disabled,
  fullWidth,
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
      {children}
    </button>
  );
};

export default Button;
