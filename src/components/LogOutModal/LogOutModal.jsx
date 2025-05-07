import Modal from '../Modal/Modal.jsx';
import ModalHeader from '../ModalHeader/ModalHeader.jsx';
import ModalActions from '../ModalActions/ModalActions.jsx';
import Button from '../Button/Button.jsx';

import { useAuth } from '../../hooks';
import toast from 'react-hot-toast';

const LogOutModal = ({ isOpen, onClose }) => {
  const { logOut, isLoading } = useAuth();

  const logOutHandler = async () => {
    try {
      await logOut();
      onClose();
      toast.success('User logged out successfully');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Are you logging out?"
        description="You can always log back in at my time."
        center
      />

      <ModalActions>
        <Button
          fullWidth
          onClick={logOutHandler}
          loading={isLoading}
          disabled={isLoading}
        >
          Log out
        </Button>

        <Button variant="outlined" onClick={onClose} fullWidth>
          Cancel
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default LogOutModal;
