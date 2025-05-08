import styles from './IconButton.module.css';
import cx from 'classnames';
import { FaPlus, FaTrash } from 'react-icons/fa';

const IconButton = ({
  onClick = () => {},
  type = 'button',
  style,
  iconId = 'plus',
  width = 3,
  height = 4,
  stroke = '#000',
}) => {
  const renderIcon = () => {
    const size = Math.min(width, height);
    switch (iconId) {
      case 'plus':
        return <FaPlus size={size} color={stroke} />;
      case 'trash':
        return <FaTrash size={size} color={stroke} />;
      default:
        return <FaPlus size={size} color={stroke} />;
    }
  };

  return (
    <button type={type} className={cx(styles.button, style)} onClick={onClick}>
      {renderIcon()}
    </button>
  );
};

export default IconButton;
