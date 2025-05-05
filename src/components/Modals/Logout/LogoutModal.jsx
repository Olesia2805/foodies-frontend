import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import '../../../assets/fonts.css';
import styles from './LogoutModal.module.css';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  useEffect(() => {
    const handleEscKey = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = e => {
    // Check if the clicked element is the overlay itself
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button 
          className={styles.modalClose} 
          onClick={onClose}
          style={{ outline: 'none' }}
          tabIndex="-1"
        >
          ×
        </button>
        <h2 className={styles.modalTitle}>ARE YOU LOGGING OUT?</h2>
        <p className={styles.modalText}>You can always log back in at my time.</p>
        
        <div className={styles.buttonsContainer}>
          <Button 
            text="LOG OUT" 
            variant="primary" 
            width="100%" 
            onClick={onLogout}
            style={{
              height: '56px',
              borderRadius: '30px',
              fontWeight: '700',
            }}
          />
          <Button 
            text="CANCEL" 
            variant="outline" 
            width="100%" 
            onClick={onClose}
            style={{
              height: '56px',
              borderRadius: '30px',
              fontWeight: '700',
            }}
          />
        </div>
      </div>
    </div>
  );
};

LogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default LogoutModal;
