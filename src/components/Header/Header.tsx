import { useAuthState } from 'react-firebase-hooks/auth';

import { GoToMain, LogOut, SignIn, SignUp } from '../Nav/Nav';
import Logo from '../Utils/Logo/Logo';
import style from './Header.module.css';
import { auth } from '../../firebase/firebaseSetup';

export default function Header() {
  const [user, loading] = useAuthState(auth);

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <Logo />
        {!loading && user === null && <SignUp />}
        {!loading && user === null && <SignIn />}
        {user && <LogOut />}
        {user && <GoToMain />}
      </div>
    </header>
  );
}
