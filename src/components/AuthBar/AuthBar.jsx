import { useState } from 'react';

import SignUpModal from '../SignUpModal/SignUpModal.jsx';
import SignInModal from '../SignInModal/SignInModal.jsx';

import styles from './AuthBar.module.css';

const AuthBar = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
    <>
      <div className={styles.authBar}>
        <button
          className={isSignInModalOpen ? styles.active : undefined}
          onClick={() => setIsSignInModalOpen(true)}
        >
          Sign in
        </button>

        <button
          className={isSignUpModalOpen ? styles.active : undefined}
          onClick={() => setIsSignUpModalOpen(true)}
        >
          Sign up
        </button>
      </div>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        setOtherModal={() => {
          setIsSignInModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        setOtherModal={() => {
          setIsSignUpModalOpen(false);
          setIsSignInModalOpen(true);
        }}
      />
    </>
  );
};

export default AuthBar;
