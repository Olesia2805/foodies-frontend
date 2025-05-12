import Icon from '../../Icon/Icon';
import styles from './IconButton.module.css';
import cx from 'classnames';
import { WHITE } from '../../../constants/colors';

const IconButton = ({
  onClick = () => {},
  type = 'button',
  style,
  iconId = 'plus',
  size = 16,
  color = WHITE,
}) => {
  const renderIcon = () => {
    switch (iconId) {
      case 'plus':
        return <Icon name="plus" fill={color} size={size} />;
      case 'trash':
        return <Icon name="trash" fill={color} size={size} />;
      default:
        return <Icon name="plus" fill={color} size={size} />;
    }
  };

  return (
    <button type={type} className={cx(styles.button, style)} onClick={onClick}>
      {renderIcon()}
    </button>
  );
};

export default IconButton;
