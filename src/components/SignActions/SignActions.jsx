import styles from './SignActions.module.css';
import SignUpModal from '../SignUpModal/SignUpModal.jsx';
import SignInModal from '../SignInModal/SignInModal.jsx';

const SignActions = () => {
  const openSignInModal = () => {};
  const openSignUpModal = () => {};

  return (
    <>
      <div className={styles.actions}>
        <button>Sign in</button>

        <button>Sign up</button>
      </div>

      {/*<SignUpModal />*/}

      {/*<SignInModal />*/}
    </>
  );
};

export default SignActions;
