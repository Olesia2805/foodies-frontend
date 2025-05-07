import Modal from '../Modal/Modal.jsx';
import ModalHeader from '../ModalHeader/ModalHeader.jsx';
import ModalActions from '../ModalActions/ModalActions.jsx';
import Button from '../Button/Button.jsx';

const VerifyEmailModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        center
        title="Thank you!"
        description={
          <>
            <span>We've sent a confirmation email to your inbox.</span>
            <span>
              Please click the link in the email to complete your registration.
            </span>
          </>
        }
      />

      <ModalActions>
        <Button fullWidth onClick={onClose}>
          Ok
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default VerifyEmailModal;
