import { useDispatch, useSelector } from 'react-redux';

import SignInModal from '../SignInModal/SignInModal.jsx';
import SignUpModal from '../SignUpModal/SignUpModal.jsx';
import VerifyEmailModal from '../VerifyEmailModal/VerifyEmailModal.jsx';

import {
  selectIsSignInModalOpen,
  selectIsSignUpModalOpen,
  selectIsVerifyEmailModalOpen,
  setIsSignInModalOpen,
  setIsSignUpModalOpen,
  setIsVerifyEmailModalOpen,
} from '../../redux/common/index.js';

const ModalContainer = () => {
  const dispatch = useDispatch();

  const isSignInModalOpen = useSelector(selectIsSignInModalOpen);
  const isSignUpModalOpen = useSelector(selectIsSignUpModalOpen);
  const isVerifyEmailModalOpen = useSelector(selectIsVerifyEmailModalOpen);

  const signInModalHandler = (isOpen) => {
    dispatch(setIsSignInModalOpen(isOpen));
  };

  const signUpModalHandler = (isOpen) => {
    dispatch(setIsSignUpModalOpen(isOpen));
  };

  const verifyEmailModalHandler = (isOpen) => {
    dispatch(setIsVerifyEmailModalOpen(isOpen));
  };

  return (
    <>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => signInModalHandler(false)}
        setOtherModal={() => {
          signInModalHandler(false);
          signUpModalHandler(true);
        }}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => signUpModalHandler(false)}
        setOtherModal={(type) => {
          signUpModalHandler(false);
          if (type === 'signIn') {
            signInModalHandler(true);
          } else {
            verifyEmailModalHandler(true);
          }
        }}
      />

      <VerifyEmailModal
        isOpen={isVerifyEmailModalOpen}
        onClose={() => verifyEmailModalHandler(false)}
      />
    </>
  );
};

export default ModalContainer;
