import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';

import { GoToMain, LogOut, SignIn, SignUp } from '../Nav/Nav';
import Logo from '../Utils/Logo/Logo';
import style from './Header.module.css';
import { auth } from '../../firebase/firebaseSetup';

export default function Header() {
  const [user] = useAuthState(auth);
  const [fix, setFix] = useState(false);

  function setFixed() {
    if (window.scrollY > 100) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  window.addEventListener('scroll', setFixed);

  return (
    <header className={fix ? style.fixed : style.header}>
      <div className={style.wrapper}>
        <Logo />
        {!user && <SignUp />}
        {!user && <SignIn />}
        {user && <LogOut />}
        {user && <GoToMain />}
      </div>
    </header>
  );
}
