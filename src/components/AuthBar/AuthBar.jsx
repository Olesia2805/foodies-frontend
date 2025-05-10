import { useDispatch, useSelector } from 'react-redux';

import {
  selectIsSignInModalOpen,
  selectIsSignUpModalOpen,
  setIsSignInModalOpen,
  setIsSignUpModalOpen,
} from '../../redux/common/index.js';

import styles from './AuthBar.module.css';

const AuthBar = () => {
  const dispatch = useDispatch();

  const isSignInModalOpen = useSelector(selectIsSignInModalOpen);
  const isSignUpModalOpen = useSelector(selectIsSignUpModalOpen);

  return (
    <>
      <div className={styles.authBar}>
        <button
          className={isSignInModalOpen ? styles.active : undefined}
          onClick={() => dispatch(setIsSignInModalOpen(true))}
        >
          Sign in
        </button>

        <button
          className={isSignUpModalOpen ? styles.active : undefined}
          onClick={() => dispatch(setIsSignUpModalOpen(true))}
        >
          Sign up
        </button>
      </div>
    </>
  );
};

export default AuthBar;
