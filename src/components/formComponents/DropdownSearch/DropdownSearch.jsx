import Select from 'react-select';
import { createFilter } from 'react-select';
import './DropdownSearch.css';
import MenuList from '../MenuList/MenuList';

export default function DropdownSearch({
  onChange,
  value,
  options,
  placeholder = 'Select placeholder',
  error,
  name,
  ...otherProps
}) {
  return (
    <Select
      name={name}
      options={options}
      filterOption={createFilter({ ignoreAccents: false })}
      placeholder={placeholder}
      unstyled
      isOptionDisabled={(option) => option.disabled}
      className="react-select-container"
      classNamePrefix="react-select"
      classNames={{
        control: (state) => {
          return error
            ? 'react-select__control react-select__control__error'
            : 'react-select__control';
        },
      }}
      onChange={onChange}
      value={value}
      components={{
        MenuList: MenuList,
      }}
      {...otherProps}
    />
  );
}
