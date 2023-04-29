import styles from './InputWithError.module.css';

interface IInputWithErrorProps {
  type: string;
  placeholder?: string;
  legend?: string;
  reff?: React.RefObject<HTMLInputElement>;
  specialStyle?: string;
  isError?: boolean;
  errorText?: string;
}

export default function InputWithError({
  type,
  placeholder,
  legend,
  reff,
  specialStyle,
  isError,
  errorText,
}: IInputWithErrorProps) {
  const specialWidth = specialStyle
    ? {
        width: specialStyle,
      }
    : {};

  return (
    <div className={styles.input_wrapper} style={specialWidth}>
      {legend && <div>{legend}</div>}
      <input
        type={type}
        placeholder={placeholder && placeholder}
        ref={reff && reff}
        className={styles.input}
      />
      <div className={styles.input_error}>{isError && errorText && errorText}</div>
    </div>
  );
}
