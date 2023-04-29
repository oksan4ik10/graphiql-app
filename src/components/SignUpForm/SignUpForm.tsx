import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import InputWithError from '../Utils/InputWithError/InputWithError';
import styles from './SignUpForm.module.css';
import Button from '../Utils/Button/Button';
import registerWithEmailAndPassword from '../../firebase/emailPassword/signUpWithEmailPassword';
import { auth } from '../../firebase/firebaseSetup';

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
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading]);

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

    if (nameRef.current?.value && emailRef.current?.value && passwordRef.current?.value) {
      registerWithEmailAndPassword(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log('registration form submitted!');
    }
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
