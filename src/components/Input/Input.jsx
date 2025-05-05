import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts.css';
import './Input.css';

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
    <div className="input-container" style={style}>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="input"
        required={required}
      />
      {!value && !isFocused && (
        <label htmlFor={name} className="input-label input-label-default">
          {placeholder}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      {icon && (
        <div className="input-icon" onClick={onIconClick}>
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
