import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import InputWithError from '../Utils/InputWithError/InputWithError';
import styles from './SignUpForm.module.css';
import Button from '../Utils/Button/Button';
import registerWithEmailAndPassword from '../../firebase/emailPassword/signUpWithEmailPassword';
import { auth } from '../../firebase/firebaseSetup';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  updateConfirm,
  updateEmail,
  updateName,
  updatePassword,
} from '../../store/reducers/signupInputsReducer';
import { updateEmailError, updateNameError } from '../../store/reducers/signupErrorsReducer';

export default function SignUpForm() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const inputName = useAppSelector((state) => state.signupInputsReducer.name_);
  const inputEmail = useAppSelector((state) => state.signupInputsReducer.email);
  const inputPass = useAppSelector((state) => state.signupInputsReducer.password);
  const inputConfirmPass = useAppSelector((state) => state.signupInputsReducer.confirmPass);
  const errorName = useAppSelector((state) => state.signupErrorsReducer.isNameError);
  const errorEmail = useAppSelector((state) => state.signupErrorsReducer.isEmailError);
  const errorPassword = useAppSelector((state) => state.signupErrorsReducer.isPasswordError);

  const [passErrorText, setPassErrorText] = useState('');
  const [clicked, setClicked] = useState(false);

  const nameDidMount = useRef(false);
  const emailDidMount = useRef(false);
  const passDidMount = useRef(false);

  useEffect(() => {
    if (nameDidMount.current && emailDidMount.current && passDidMount.current) {
      if (!errorName && !errorEmail && !errorPassword && clicked) {
        registerWithEmailAndPassword(inputName, inputEmail, inputPass);
        console.log('registration form submitted!');
      }
    } else console.log('registration error');
  }, [clicked]);

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading]);

  useEffect(() => {
    if (nameDidMount.current) validateName();
    nameDidMount.current = true;
  }, [inputName]);

  useEffect(() => {
    if (emailDidMount.current) validateEmail();
    emailDidMount.current = true;
  }, [inputEmail]);

  useEffect(() => {
    if (passDidMount.current) validatePassword();
    passDidMount.current = true;
  }, [inputPass, inputConfirmPass]);

  const passwErrorTextOpts = {
    length: 'Password must have at least 8 characters.',
    letter: 'Password must have at least 1 letter.',
    num: 'Password must have at least 1 number.',
    special: 'Password must have at least 1 special character.',
    different: 'Please confirm your password.',
  };

  const handleChange = (field: 'name_' | 'email' | 'password' | 'confirmPass', value: string) => {
    setClicked(false);
    switch (field) {
      case 'name_':
        dispatch(updateName(value));
        break;
      case 'email':
        dispatch(updateEmail(value));
        break;
      case 'password':
        dispatch(updatePassword(value));
        break;
      case 'confirmPass':
        dispatch(updateConfirm(value));
        break;
    }
  };

  // validation logic
  const validateName = () => {
    if (inputName.length < 1 || !inputName.match(/^[a-zA-Zа-яА-Я \-]+$/)) {
      dispatch(updateNameError(true));
    } else {
      dispatch(updateNameError(false));
    }
  };

  const validateEmail = () => {
    if (inputEmail.length < 1) {
      dispatch(updateEmailError(true));
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
      dispatch(updateEmailError(true));
      return;
    }

    dispatch(updateEmailError(false));
  };

  const validatePassword = () => {
    //console.log(inputPass);
  };

  const handeSubmit = (e: FormEvent) => {
    e.preventDefault();

    setClicked(true);

    validateName();
    validateEmail();
    validatePassword();
  };

  return (
    <div className={styles.signup_wrap}>
      <form className={styles.signup_in_wrap} onSubmit={(e) => handeSubmit(e)}>
        <InputWithError
          type="text"
          placeholder="Your Name"
          value={inputName}
          onChange={(e) => handleChange('name_', e.target.value)}
          isError={errorName}
          errorText="Please specify your name."
        />
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
        <InputWithError
          type="text"
          placeholder="Confirm Password"
          value={inputConfirmPass}
          onChange={(e) => handleChange('confirmPass', e.target.value)}
        />
        <Button buttonType="submit" buttonText="Sign Up" buttonWidth="84%" />
        <div className={styles.signup_signin}>
          Already have an account? <a onClick={() => navigate('/signin')}>Sign in now!</a>
        </div>
      </form>
    </div>
  );
}
