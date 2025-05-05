import styles from './ModalHeader.module.css';

const ModalHeader = ({ title, description = '', center = false }) => {
  return (
    <div className={`${styles.container} ${center ? styles.center : ''}`}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default ModalHeader;
