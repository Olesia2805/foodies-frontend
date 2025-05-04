import styles from './Modal.module.css';
import Icon from '../Icon/Icon.jsx';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
