import styles from './Input.module.css';

interface IInputWithErrorProps {
  type: string;
  placeholder?: string;
  legend?: string;
  ref?: React.RefObject<HTMLInputElement>;
  specialStyle?: string;
  isError?: boolean;
  errorText?: string;
}

export default function InputWithError({
  type,
  placeholder,
  legend,
  ref,
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
      <input type={type} placeholder={placeholder && placeholder} ref={ref && ref} />
      <div>{isError && errorText && errorText}</div>
    </div>
  );
}
