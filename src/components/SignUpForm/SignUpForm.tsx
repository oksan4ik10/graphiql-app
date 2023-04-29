import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import InputWithError from '../Utils/InputWithError/InputWithError';
import styles from './SignUpForm.module.css';
import Button from '../Utils/Button/Button';

interface IErrors {
  isNameError: boolean;
  isEmailError: boolean;
  isPasswordError: boolean;
}

export default function SignUpForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const errors: IErrors = {
    isNameError: false,
    isEmailError: false,
    isPasswordError: false,
  };

  const passwordErrorText = {
    current: '',
    length: 'Password must have at least 8 characters.',
    letter: 'Password must have at least 1 letter.',
    num: 'Password must have at least 1 number.',
    special: 'Password must have at least 1 special character.',
    different: 'Please confirm your password.',
  };

  const handeSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('registration form submitted!');
  };

  return (
    <div className={styles.signup_wrap}>
      <form className={styles.signup_in_wrap} onSubmit={(e) => handeSubmit(e)}>
        <InputWithError
          type="text"
          placeholder="Your Name"
          reff={nameRef}
          isError={errors.isNameError}
          errorText="Please specify your name."
        />
        <InputWithError
          type="text"
          placeholder="Your Email"
          reff={emailRef}
          isError={errors.isEmailError}
          errorText="Please specify correct email."
        />
        <InputWithError
          type="text"
          placeholder="Your Password"
          reff={passwordRef}
          isError={errors.isPasswordError}
          errorText={passwordErrorText.current}
        />
        <InputWithError type="text" placeholder="Confirm Password" reff={confirmPassRef} />
        <Button buttonType="submit" buttonText="Sign Up" buttonWidth="84%" />
        <div className={styles.signup_signin}>
          Already have an account? <a onClick={() => navigate('/signin')}>Sign in now!</a>
        </div>
      </form>
    </div>
  );
}
