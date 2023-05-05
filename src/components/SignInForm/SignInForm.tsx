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
import {
  updateEmailLogin,
  updatePassErrorTextLogin,
  updatePasswordLogin,
} from '../../store/reducers/signinInputsReducer';
import {
  updateEmailErrorLogin,
  updatePasswordErrorLogin,
} from '../../store/reducers/signinErrorsReducer';
import sendPasswordReset from '../../firebase/emailPassword/resetPassword';
import returnToDefaultState from '../../store/returnToDefaultState';
import { Modal } from '../Utils/Modal/Modal';

export default function SignInForm() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [isModal, setIsModal] = useState(false);
  const signInErrorText = useRef<string>('');

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/main');
  }, [user, loading]);

  const dispatch = useAppDispatch();
  const inputEmail = useAppSelector<string>((state) => state.signinInputsReducer.email);
  const inputPass = useAppSelector<string>((state) => state.signinInputsReducer.password);
  const errorEmail = useAppSelector<boolean>((state) => state.signinErrorsReducer.isEmailError);
  const errorPassword = useAppSelector<boolean>(
    (state) => state.signinErrorsReducer.isPasswordError
  );
  const errorPassText = useAppSelector<string>((state) => state.signinInputsReducer.passError);

  const [clicked, setClicked] = useState(false);

  const emailDidMount = useRef(false);
  const passDidMount = useRef(false);

  useEffect(() => {
    if (emailDidMount.current && passDidMount.current) {
      if (!errorEmail && !errorPassword && clicked) {
        logInWithEmailAndPassword(inputEmail, inputPass).then((data) => {
          if (data && data.includes('auth/user-not-found')) {
            signInErrorText.current = 'Email not found. Please check the email you used.';
            setIsModal(true);
            setClicked(false);
            return;
          } else if (data && data.includes('auth/wrong-password')) {
            signInErrorText.current = 'Incorrect password. Please check the password you used.';
            setIsModal(true);
            setClicked(false);
            return;
          } else if (data && data.includes('Error')) {
            signInErrorText.current = 'Please try again.';
            setIsModal(true);
            setClicked(false);
            return;
          }
          returnToDefaultState();
        });
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

  const validatePassword = () => {
    if (inputPass.length < 8) {
      if (!errorPassword) dispatch(updatePasswordErrorLogin(true));
      dispatch(updatePassErrorTextLogin('length'));
    } else if (!inputPass.match(/^(?=.*[a-zA-Z])/)) {
      if (!errorPassword) dispatch(updatePasswordErrorLogin(true));
      dispatch(updatePassErrorTextLogin('letter'));
    } else if (!inputPass.match(/^(?=.*\d)/)) {
      if (!errorPassword) dispatch(updatePasswordErrorLogin(true));
      dispatch(updatePassErrorTextLogin('num'));
    } else if (!inputPass.match(/^(?=.*[!#$%&? "])/)) {
      if (!errorPassword) dispatch(updatePasswordErrorLogin(true));
      dispatch(updatePassErrorTextLogin('special'));
    } else {
      if (errorPassword) dispatch(updatePasswordErrorLogin(false));
      dispatch(updatePassErrorTextLogin('initial'));
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

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      {isModal && (
        <Modal modalFunc={closeModal}>
          <div className={styles.modal_error}>There was an error.</div>
          <div>{signInErrorText.current}</div>
        </Modal>
      )}
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
            errorText={errorPassText}
          />
          <Button buttonType="submit" buttonText="Sign In" buttonWidth="80%" />
          <Button
            func={() => {
              signInWithGoogle().then(() => returnToDefaultState());
            }}
            buttonType="button"
            buttonText="Sign In with Google"
            buttonWidth="80%"
          />
          <a className={styles.signin_forgot} onClick={resetPassword}>
            Forgot password?
          </a>
          <div className={styles.signup_signin}>
            {"Don't have an account?"} <a onClick={() => navigate('/signup')}>Sign up now!</a>
          </div>
        </form>
      </div>
    </>
  );
}
