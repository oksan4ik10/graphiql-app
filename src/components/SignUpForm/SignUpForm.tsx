import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

import styles from './SignUpForm.module.css';

import InputWithError from '../Utils/InputWithError/InputWithError';
import Button from '../Utils/Button/Button';
import registerWithEmailAndPassword from '../../firebase/emailPassword/signUpWithEmailPassword';
import { auth } from '../../firebase/firebaseSetup';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  updateConfirm,
  updateEmail,
  updateName,
  updatePassErrorText,
  updatePassword,
} from '../../store/reducers/signupInputsReducer';
import {
  updateEmailError,
  updateNameError,
  updatePasswordError,
} from '../../store/reducers/signupErrorsReducer';
import { Modal } from '../Utils/Modal/Modal';

export default function SignUpForm() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [isModal, setIsModal] = useState(false);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const inputName = useAppSelector<string>((state) => state.signupInputsReducer.name_);
  const inputEmail = useAppSelector<string>((state) => state.signupInputsReducer.email);
  const inputPass = useAppSelector<string>((state) => state.signupInputsReducer.password);
  const inputConfirmPass = useAppSelector<string>((state) => state.signupInputsReducer.confirmPass);
  const errorName = useAppSelector<boolean>((state) => state.signupErrorsReducer.isNameError);
  const errorEmail = useAppSelector<boolean>((state) => state.signupErrorsReducer.isEmailError);
  const errorPassword = useAppSelector<boolean>(
    (state) => state.signupErrorsReducer.isPasswordError
  );
  const errorPassText = useAppSelector<string>((state) => state.signupInputsReducer.passError);

  const [clicked, setClicked] = useState(false);

  const nameDidMount = useRef(false);
  const emailDidMount = useRef(false);
  const passDidMount = useRef(false);

  useEffect(() => {
    if (nameDidMount.current && emailDidMount.current && passDidMount.current) {
      if (!errorName && !errorEmail && !errorPassword && clicked) {
        registerWithEmailAndPassword(inputName, inputEmail, inputPass).then((data) => {
          if (data && data.includes('Error')) {
            setIsModal(true);
            setClicked(false);
          }
        });
      }
    }
  }, [clicked]);

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/main');
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

  const handleChange = (field: 'name_' | 'email' | 'password' | 'confirmPass', value: string) => {
    if (clicked) setClicked(false);

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
    if (inputPass.length < 8) {
      if (!errorPassword) dispatch(updatePasswordError(true));
      dispatch(updatePassErrorText('length'));
    } else if (!inputPass.match(/^(?=.*[a-zA-Z])/)) {
      if (!errorPassword) dispatch(updatePasswordError(true));
      dispatch(updatePassErrorText('letter'));
    } else if (!inputPass.match(/^(?=.*\d)/)) {
      if (!errorPassword) dispatch(updatePasswordError(true));
      dispatch(updatePassErrorText('num'));
    } else if (!inputPass.match(/^(?=.*[!#$*_@^()\-+=%&? "])/)) {
      if (!errorPassword) dispatch(updatePasswordError(true));
      dispatch(updatePassErrorText('special'));
    } else if (inputPass !== inputConfirmPass) {
      if (!errorPassword) dispatch(updatePasswordError(true));
      dispatch(updatePassErrorText('different'));
    } else {
      if (errorPassword) dispatch(updatePasswordError(false));
      dispatch(updatePassErrorText('initial'));
    }
  };

  const handeSubmit = (e: FormEvent) => {
    e.preventDefault();

    setClicked(true);

    validateName();
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
          <div className={styles.modal_error}>{t('some error')}</div>
          <div>{t('try again')}</div>
        </Modal>
      )}
      <div className={styles.signup_wrap}>
        <form className={styles.signup_in_wrap} onSubmit={(e) => handeSubmit(e)}>
          <InputWithError
            type="text"
            placeholder={t('your name')}
            value={inputName}
            onChange={(e) => handleChange('name_', e.target.value)}
            isError={errorName}
            errorText={t('err name')}
          />
          <InputWithError
            type="text"
            placeholder={t('your email')}
            value={inputEmail}
            onChange={(e) => handleChange('email', e.target.value)}
            isError={errorEmail}
            errorText={t('err email')}
          />
          <InputWithError
            type="text"
            placeholder={t('your pass')}
            value={inputPass}
            onChange={(e) => handleChange('password', e.target.value)}
            isError={errorPassword}
            errorText={t(errorPassText)}
          />
          <InputWithError
            type="text"
            placeholder={t('your confirm')}
            value={inputConfirmPass}
            onChange={(e) => handleChange('confirmPass', e.target.value)}
          />
          <Button buttonType="submit" buttonText={t('sign up verb')} buttonWidth="80%" />
          <div className={styles.signup_signin}>
            {t('yes acc')} <a onClick={() => navigate('/signin')}>{t('yes acc sign in')}</a>
          </div>
        </form>
      </div>
    </>
  );
}
