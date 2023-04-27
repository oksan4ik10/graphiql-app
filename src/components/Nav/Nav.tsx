import { NavLink } from 'react-router-dom';

import style from './Nav.module.css';
import Button from '../Utils/Button/Button';

export function SignUp() {
  return (
    <NavLink to="/signup" className={style.header_nav_item}>
      <Button buttonText="Sign Up" buttonType="button" />
    </NavLink>
  );
}

export function SignIn() {
  return (
    <NavLink to="/signin" className={style.header_nav_item}>
      <Button buttonText="Sign In" buttonType="button" />
    </NavLink>
  );
}

//пока что кнопка просто ведёт назад на WelcomePage
export function LogOut() {}

export function GoToMain() {}

console.log(Button);
