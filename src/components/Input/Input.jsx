import styles from './Input.module.css';

const Input = ({
  icon,
  onIconClick,
  style,
  placeholder,
  required,
  ...props
}) => {
  return (
    <label className={styles.inputContainer} style={style}>
      <input
        placeholder={required ? `${placeholder}*` : placeholder}
        className={styles.input}
        {...props}
      />

      {icon && (
        <div className={styles.inputIcon} onClick={onIconClick}>
          {icon}
        </div>
      )}
    </label>
  );
};

export default Input;
