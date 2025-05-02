import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts.css';
import { 
  dropdownContainerStyles, 
  dropdownStyles, 
  iconStyles,
  optionsContainerStyles,
  optionStyles,
  optionHoverStyles,
  requiredStyles
} from './Dropdown.styles';

const Dropdown = ({
  value,
  onChange,
  placeholder,
  options = [],
  required = false,
  iconSrc,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = () => {
    // Small delay to allow option click to register before closing
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get the selected option display text
  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : '';

  return (
    <div 
      ref={dropdownRef}
      style={{ ...dropdownContainerStyles, ...style }}
    >
      <div 
        onClick={handleToggle}
        onBlur={handleBlur}
        tabIndex="0"
        style={{
          ...dropdownStyles,
          borderColor: isOpen ? '#1A1A1A' : '#E5E5E5',
        }}
      >
        {displayText || (
          <span style={{ color: '#757575' }}>
            {placeholder}
            {required && <span style={requiredStyles}>*</span>}
          </span>
        )}
      </div>
      
      <div style={iconStyles}>
        <img 
          src={iconSrc} 
          alt="dropdown arrow" 
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </div>
      
      {isOpen && (
        <div style={optionsContainerStyles}>
          {options.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              style={{
                ...optionStyles,
                ...(hoveredIndex === index ? optionHoverStyles : {}),
                ...(option.value === value ? { fontWeight: 'bold' } : {}),
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
  iconSrc: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Dropdown;
