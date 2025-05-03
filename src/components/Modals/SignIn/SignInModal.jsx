import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import '../../../assets/fonts.css';
import styles from './SignInModal.module.css';
import eyeIcon from '../../../assets/Icons/eye.svg';
import eyeOffIcon from '../../../assets/Icons/eye-off.svg';

const SignInModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Sign in attempt with:', { email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <h2 className={styles.modalTitle}>SIGN IN</h2>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required={true}
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required={true}
            icon={
              <img
                src={showPassword ? eyeOffIcon : eyeIcon}
                alt={showPassword ? 'Hide password' : 'Show password'}
                width="24"
                height="24"
              />
            }
            onIconClick={togglePasswordVisibility}
          />

          <div style={{ marginTop: '20px' }}>
            <Button
              text="SIGN IN"
              variant="secondary"
              width="100%"
              onClick={handleSubmit}
              style={{
                height: '56px',
                borderRadius: '30px',
                fontWeight: '700',
              }}
            />
          </div>
        </form>

        <div className={styles.modalFooter}>
          <span>Don't have an account?</span>
          <a href="#" onClick={() => console.log('Create account clicked')}>
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

SignInModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignInModal;
