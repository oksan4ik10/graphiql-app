import { useAuthState } from 'react-firebase-hooks/auth';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GoToMain, LogOut, SignIn, SignUp } from '../Nav/Nav';
import Logo from '../Utils/Logo/Logo';
import styles from './Header.module.css';
import { auth } from '../../firebase/firebaseSetup';

export default function Header() {
  const [user, loading] = useAuthState(auth);
  const [fix, setFix] = useState(false);

  const langRef = useRef<HTMLInputElement>(null);
  const { i18n } = useTranslation();

  function setFixed() {
    if (window.scrollY > 100) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  window.addEventListener('scroll', setFixed);

  const checkLanguage = () => {
    if (langRef.current?.checked) {
      i18n.changeLanguage('ru');
    } else {
      i18n.changeLanguage('en');
    }
  };

  return (
    <header className={fix ? styles.fixed : styles.header}>
      <div className={styles.wrapper}>
        <Logo />
        {!loading && user === null && <SignUp />}
        {!loading && user === null && <SignIn />}
        {user && <LogOut />}
        {user && <GoToMain />}
        <input
          id="toggle"
          onClick={checkLanguage}
          ref={langRef}
          type="checkbox"
          className={styles.lang}
        />
        <label htmlFor="toggle" className={styles.lang_label}></label>
      </div>
    </header>
  );
}
