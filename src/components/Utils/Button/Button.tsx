import './Button.css';

interface IButtonProps {
  buttonText: string;
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  buttonStyle?: 'alternate_back' | '';
  func?: () => void;
}

export default function Button({ buttonText, buttonType, buttonStyle, func }: IButtonProps) {
  const handleClick = () => {
    func && func();
  };

  return (
    <button
      onClick={handleClick}
      className={buttonStyle ? `button ${buttonStyle}` : 'button'}
      type={buttonType}
    >
      {buttonText}
    </button>
  );
}
