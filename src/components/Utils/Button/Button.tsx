import style from './Button.module.css';

interface IButtonProps {
  buttonText: string;
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  buttonStyle?: string;
}

export default function Button({ buttonText, buttonType, buttonStyle }: IButtonProps) {
  return (
    <button
      className={buttonStyle ? `${buttonStyle} ${style.button}` : style.button}
      type={buttonType}
    >
      {buttonText}
    </button>
  );
}
