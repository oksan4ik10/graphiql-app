import './Button.css';

interface IButtonProps {
  buttonText: string;
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  buttonStyle?: 'alternate_back' | '';
  buttonWidth?: string;
  func?: () => void;
}

export default function Button({
  buttonText,
  buttonType,
  buttonStyle,
  buttonWidth,
  func,
}: IButtonProps) {
  const specialWidth = buttonWidth
    ? {
        width: buttonWidth,
      }
    : {};

  const handleClick = () => {
    func && func();
  };

  return (
    <button
      style={specialWidth}
      onClick={handleClick}
      className={buttonStyle ? `button ${buttonStyle}` : 'button'}
      type={buttonType}
    >
      {buttonText}
    </button>
  );
}
