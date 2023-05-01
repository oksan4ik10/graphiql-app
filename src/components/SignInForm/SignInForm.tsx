import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from './SignInForm.module.css';

import InputWithError from '../Utils/InputWithError/InputWithError';
import Button from '../Utils/Button/Button';
import signInWithGoogle from '../../firebase/google/signInWIthGoogle';
import { auth } from '../../firebase/firebaseSetup';
import { useAppDispatch, useAppSelector } from '../../store/store';
import logInWithEmailAndPassword from '../../firebase/emailPassword/signInWithEmailPassword';
import { updateEmailLogin, updatePasswordLogin } from '../../store/reducers/signinInputsReducer';
import {
  updateEmailErrorLogin,
  updatePasswordErrorLogin,
} from '../../store/reducers/signinErrorsReducer';
import sendPasswordReset from '../../firebase/emailPassword/resetPassword';
import returnToDefaultState from '../../store/returnToDefaultState';

export default function SignInForm() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/main');
  }, [user, loading]);

  const dispatch = useAppDispatch();
  const inputEmail = useAppSelector((state) => state.signinInputsReducer.email);
  const inputPass = useAppSelector((state) => state.signinInputsReducer.password);
  const errorEmail = useAppSelector((state) => state.signinErrorsReducer.isEmailError);
  const errorPassword = useAppSelector((state) => state.signinErrorsReducer.isPasswordError);

  const [passErrorText, setPassErrorText] = useState('');
  const [clicked, setClicked] = useState(false);

  const emailDidMount = useRef(false);
  const passDidMount = useRef(false);

  useEffect(() => {
    if (emailDidMount.current && passDidMount.current) {
      if (!errorEmail && !errorPassword && clicked) {
        logInWithEmailAndPassword(inputEmail, inputPass).then(() => returnToDefaultState());
        
      }
    }
  }, [clicked]);

  useEffect(() => {
    if (emailDidMount.current) validateEmail();
    emailDidMount.current = true;
  }, [inputEmail]);

  useEffect(() => {
    if (passDidMount.current) validatePassword();
    passDidMount.current = true;
  }, [inputPass]);

  const handleChange = (field: 'email' | 'password', value: string) => {
    if (clicked) setClicked(false);

    switch (field) {
      case 'email':
        dispatch(updateEmailLogin(value));
        break;
      case 'password':
        dispatch(updatePasswordLogin(value));
        break;
    }
  };

  const validateEmail = () => {
    if (inputEmail.length < 1) {
      dispatch(updateEmailErrorLogin(true));
      return;
    }

    const lastAtPos = inputEmail.lastIndexOf('@');
    const lastDotPos = inputEmail.lastIndexOf('.');

    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        inputEmail.indexOf('@@') == -1 &&
        lastDotPos > 2 &&
        inputEmail.length - lastDotPos > 2
      )
    ) {
      dispatch(updateEmailErrorLogin(true));
      return;
    }

    dispatch(updateEmailErrorLogin(false));
  };

  const passwErrorTextOpts = {
    length: 'Password must have at least 8 characters.',
    letter: 'Password must have at least 1 letter.',
    num: 'Password must have at least 1 number.',
    special: 'Password must have at least 1 special character.',
  };

  const validatePassword = () => {
    if (inputPass.length < 8) {
      if (!errorPassword) dispatch(updatePasswordErrorLogin(true));
      setPassErrorText(passwErrorTextOpts.length);
    } else if (!inputPass.match(/^(?=.*[a-zA-Z])/)) {
      if (!errorPassword) dispatch(updatePasswordErrorLogin(true));
      setPassErrorText(passwErrorTextOpts.letter);
    } else if (!inputPass.match(/^(?=.*\d)/)) {
      if (!errorPassword) dispatch(updatePasswordErrorLogin(true));
      setPassErrorText(passwErrorTextOpts.num);
    } else if (!inputPass.match(/^(?=.*[!#$%&? "])/)) {
      if (!errorPassword) dispatch(updatePasswordErrorLogin(true));
      setPassErrorText(passwErrorTextOpts.special);
    } else {
      if (errorPassword) dispatch(updatePasswordErrorLogin(false));
      setPassErrorText('');
    }
  };

  //TODO
  const resetPassword = () => {
    sendPasswordReset(inputEmail);
  };

  const handeSubmit = (e: FormEvent) => {
    e.preventDefault();

    setClicked(true);

    validateEmail();
    validatePassword();
  };

  return (
    <div className={styles.signin_wrap}>
      <form className={styles.signin_in_wrap} onSubmit={(e) => handeSubmit(e)}>
        <InputWithError
          type="text"
          placeholder="Your Email"
          value={inputEmail}
          onChange={(e) => handleChange('email', e.target.value)}
          isError={errorEmail}
          errorText="Please specify correct email."
        />
        <InputWithError
          type="text"
          placeholder="Your Password"
          value={inputPass}
          onChange={(e) => handleChange('password', e.target.value)}
          isError={errorPassword}
          errorText={passErrorText}
        />
        <Button buttonType="submit" buttonText="Sign In" buttonWidth="84%" />
        <Button
          func={() => {
            signInWithGoogle().then(() => returnToDefaultState());
          }}
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
