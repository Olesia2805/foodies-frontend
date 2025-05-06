import Modal from '../Modal/Modal.jsx';
import ModalHeader from '../ModalHeader/ModalHeader.jsx';
import ModalActions from '../ModalActions/ModalActions.jsx';
import Button from '../Button/Button.jsx';

import { useAuth } from '../../hooks';

const LogOutModal = ({ isOpen, onClose }) => {
  const { logOut } = useAuth();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Are you logging out?"
        description="You can always log back in at my time."
        center
      />

      <ModalActions>
        <Button onClick={logOut} fullWidth>
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
