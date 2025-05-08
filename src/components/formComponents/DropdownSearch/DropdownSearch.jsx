import Select from 'react-select';
import './Select.css';

import React from 'react';

export default function DropdownSearch({
  onChange,
  value,
  options,
  placeholder = 'Select placeholder',
}) {
  return (
    <Select
      placeholder={placeholder}
      unstyled
      options={options}
      isOptionDisabled={(option) => option.disabled}
      // classNames={{
      //   control: (state) =>
      //     (state.isFocused || state.isHovered) &&
      //     'react-select__control--menu-is-open',
      // }}
      className="react-select-container"
      classNamePrefix="react-select"
      onChange={onChange}
      value={value}
    />
  );
}
