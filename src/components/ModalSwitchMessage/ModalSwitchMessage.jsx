import styles from './ModalSwitchMessage.module.css';

const ModalSwitchMessage = ({ message, buttonText, onClick }) => {
  return (
    <div className={styles.message}>
      {message}{' '}
      <button type="button" onClick={onClick} className={styles.button}>
        {buttonText}
      </button>
    </div>
  );
};

export default ModalSwitchMessage;
