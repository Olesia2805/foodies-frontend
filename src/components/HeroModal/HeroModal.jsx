import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import styles from './HeroModal.module.css';

const modalRoot = document.getElementById('modal-root') || document.createElement('div');

if (!document.getElementById('modal-root')) {
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
}

const HeroModal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <Icon name="close" size={24} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default HeroModal;