import Select from 'react-select';
import { createFilter } from 'react-select';
import './DropdownSearch.css';

import React from 'react';
import MenuList from '../MenuList/MenuList';

export default function DropdownSearch({
  onChange,
  value,
  options,
  placeholder = 'Select placeholder',
  ...otherProps
}) {
  return (
    <Select
      options={options}
      filterOption={createFilter({ ignoreAccents: false })}
      placeholder={placeholder}
      unstyled
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
      components={{
        MenuList: MenuList,
      }}
      {...otherProps}
    />
  );
}
