import styles from './LogOutModal.module.css';

const LogOutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modal}>
      <p>Are you sure you want to log out?</p>
      <div className={styles.actions}>
        <button onClick={onConfirm} className={styles.confirm}>Log Out</button>
        <button onClick={onCancel} className={styles.cancel}>Cancel</button>
      </div>
    </div>
  );
};

export default LogOutModal;