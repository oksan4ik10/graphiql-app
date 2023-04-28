import './Button.css';

interface IButtonProps {
  buttonText: string;
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  buttonStyle?: 'alternate_back' | '';
}

export default function Button({ buttonText, buttonType, buttonStyle }: IButtonProps) {
  return (
    <button className={buttonStyle ? `button ${buttonStyle}` : 'button'} type={buttonType}>
      {buttonText}
    </button>
  );
}
