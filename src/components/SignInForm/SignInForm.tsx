import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SignInForm.module.css';
import InputWithError from '../Utils/InputWithError/InputWithError';
import Button from '../Utils/Button/Button';

interface IErrors {
  isEmailError: boolean;
  isPasswordError: boolean;
}

export default function SignInForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const errors: IErrors = {
    isEmailError: false,
    isPasswordError: false,
  };

  const handeSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('login form submitted!');
  };

  const signInWithGoogle = () => {};

  const resetPassword = () => {};

  return (
    <div className={styles.signin_wrap}>
      <form className={styles.signin_in_wrap} onSubmit={(e) => handeSubmit(e)}>
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
          errorText="Please fill in your password."
        />
        <Button buttonType="submit" buttonText="Sign In" buttonWidth="84%" />
        <Button
          func={signInWithGoogle}
          buttonType="button"
          buttonText="Sign In with Google"
          buttonWidth="84%"
        />
        <a onClick={resetPassword}>Forgot password?</a>
        <div className={styles.signup_signin}>
          {"Don't have an account?"} <a onClick={() => navigate('/signup')}>Sign up now!</a>
        </div>
      </form>
    </div>
  );
}
