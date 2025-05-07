import styles from './Input.module.css';

const Input = ({
  icon,
  onIconClick,
  style,
  placeholder,
  required,
  error,
  ...props
}) => {
  return (
    <label className={styles.inputContainer} style={style}>
      <input
        placeholder={required ? `${placeholder}*` : placeholder}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...props}
      />
      {icon && (
        <div className={styles.inputIcon} onClick={onIconClick}>
          {icon}
        </div>
      )}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </label>
  );
};

export default Input;
