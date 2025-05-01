import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts.css';
import { 
  inputContainerStyles, 
  inputStyles, 
  labelStyles, 
  iconStyles,
  requiredStyles
} from './Input.styles';

const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  onIconClick,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  return (
    <div style={{ ...inputContainerStyles, ...style }}>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={inputStyles}
        required={required}
      />
      {!value && !isFocused && (
        <label 
          htmlFor={name} 
          style={{
            ...labelStyles,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '16px',
          }}
        >
          {placeholder}
          {required && <span style={requiredStyles}>*</span>}
        </label>
      )}
      {icon && (
        <div style={iconStyles} onClick={onIconClick}>
          {icon}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  icon: PropTypes.node,
  onIconClick: PropTypes.func,
  style: PropTypes.object,
};

export default Input;
