import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Icon from '../Icon/Icon';
import css from './Dropdown.module.css';

const Dropdown = ({
  items = [],
  label,
  selectedValue,
  callback,
  isMulti = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const validItems = Array.isArray(items)
    ? items.filter((item) => item && item.name)
    : [];

  const filteredItems = validItems.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemSelect = (item) => {
    if (!item) return;

    if (isMulti) {
      const safeSelectedValue = Array.isArray(selectedValue)
        ? selectedValue
        : [];
      const isSelected = safeSelectedValue.some(
        (selected) => selected?.value === item.value
      );

      const newSelectedValue = isSelected
        ? safeSelectedValue.filter((selected) => selected?.value !== item.value)
        : [...safeSelectedValue, item];

      dispatch(callback(newSelectedValue));
    } else {
      dispatch(callback(item));
      setIsOpen(false);
    }
  };

  const isItemSelected = (item) => {
    if (!item) return false;

    if (isMulti) {
      const safeSelectedValue = Array.isArray(selectedValue)
        ? selectedValue
        : [];
      return safeSelectedValue.some(
        (selected) => selected?.value === item.value
      );
    }
    return selectedValue?.value === item.value;
  };

  const displaySelectedValue = () => {
    if (isMulti) {
      const safeSelectedValue = Array.isArray(selectedValue)
        ? selectedValue
        : [];
      return safeSelectedValue.length > 0
        ? `Selected: ${safeSelectedValue.length}`
        : label;
    }
    return selectedValue?.name || label;
  };

  return (
    <div className={css.dropdownContainer} ref={dropdownRef}>
      <button
        className={css.dropdownButton}
        onClick={toggleDropdown}
        type="button"
      >
        <span>{displaySelectedValue()}</span>
        <Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          className={css.dropdownIcon}
        />
      </button>

      {isOpen && (
        <div className={css.dropdownContent}>
          <div className={css.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={css.searchInput}
            />
          </div>

          <ul className={css.optionsList}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li
                  key={item.value}
                  className={`${css.optionItem} ${
                    isItemSelected(item) ? css.selected : ''
                  }`}
                  onClick={() => handleItemSelect(item)}
                >
                  {item.name}
                  {isItemSelected(item) && (
                    <Icon name="check" className={css.checkIcon} />
                  )}
                </li>
              ))
            ) : (
              <li className={css.noResults}>
                {searchTerm ? 'No results found' : 'No items available'}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
