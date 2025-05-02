import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts.css';
import './Button.css';

const Button = ({ 
  text, 
  variant = 'primary', 
  onClick,
  width,
  height,
  style,
  disabled
}) => {
  const customStyle = {
    width: width || 'auto',
    height: height || '56px',
    ...style,
  };

  return (
    <button 
      className={`button button-${variant}`}
      style={customStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  onClick: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  disabled: PropTypes.bool
};

export default Button;
