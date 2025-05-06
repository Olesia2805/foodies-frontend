import styles from './FormInputs.module.css';

const FormInputs = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default FormInputs;
