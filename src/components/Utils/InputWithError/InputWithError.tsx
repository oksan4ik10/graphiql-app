import { ChangeEvent } from 'react';
import styles from './InputWithError.module.css';

interface IInputWithErrorProps {
  type: string;
  placeholder?: string;
  legend?: string;
  reff?: React.RefObject<HTMLInputElement>;
  value?: string;
  specialStyle?: string;
  isError?: boolean;
  errorText?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithError({
  type,
  placeholder,
  legend,
  reff,
  value,
  specialStyle,
  isError,
  errorText,
  onChange,
}: IInputWithErrorProps) {
  const specialWidth = specialStyle
    ? {
        width: specialStyle,
      }
    : {};

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <div className={styles.input_wrapper} style={specialWidth}>
      {legend && <div>{legend}</div>}
      <input
        type={type}
        placeholder={placeholder && placeholder}
        ref={reff && reff}
        value={value && value}
        className={styles.input}
        onChange={(e) => handleChange(e)}
      />
      <div className={styles.input_error}>{isError && errorText && errorText}</div>
    </div>
  );
}
