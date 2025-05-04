import styles from './SignActions.module.css';
import SignUpModal from '../SignUpModal/SignUpModal.jsx';
import SignInModal from '../SignInModal/SignInModal.jsx';
import { useState } from 'react';

const SignActions = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  return (
    <>
      <div className={styles.actions}>
        <button onClick={() => setIsSignInModalOpen(true)}>Sign in</button>

        <button onClick={() => setIsSignUpModalOpen(true)}>Sign up</button>
      </div>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      />
    </>
  );
};

export default SignActions;
