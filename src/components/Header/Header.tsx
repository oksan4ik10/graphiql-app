import { GoToMain, LogOut, SignIn, SignUp } from '../Nav/Nav';
import Logo from '../Utils/Logo/Logo';
import style from './Header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <Logo />
        <SignUp />
        <SignIn />
        <LogOut />
        <GoToMain />
      </div>
    </header>
  );
}
