import styles from './ModalActions.module.css';

const ModalActions = ({ children }) => {
  return <div className={styles.actions}>{children}</div>;
};

export default ModalActions;
