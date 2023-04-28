import { NavLink } from 'react-router-dom';

import style from './Nav.module.css';
import Button from '../Utils/Button/Button';

export function SignUp() {
  return (
    <NavLink
      to="/signup"
      className={style.header_nav_item}
      children={({ isActive }) => (
        <Button
          buttonText="Sign Up"
          buttonType="button"
          buttonStyle={isActive ? 'alternate_back' : ''}
        />
      )}
    />
  );
}

export function SignIn() {
  return (
    <NavLink
      to="/signin"
      className={style.header_nav_item}
      children={({ isActive }) => (
        <Button
          buttonText="Sign In"
          buttonType="button"
          buttonStyle={isActive ? 'alternate_back' : ''}
        />
      )}
    />
  );
}

//пока что кнопка просто ведёт назад на WelcomePage
export function LogOut() {
  return (
    <NavLink
      to="/"
      className={style.header_nav_item}
      children={({ isActive }) => (
        <Button
          buttonText="Log Out"
          buttonType="button"
          buttonStyle={isActive ? 'alternate_back' : ''}
        />
      )}
    />
  );
}

export function GoToMain() {
  return (
    <NavLink
      to="/main"
      className={style.header_nav_item}
      children={({ isActive }) => (
        <Button
          buttonText="To Main"
          buttonType="button"
          buttonStyle={isActive ? 'alternate_back' : ''}
        />
      )}
    />
  );
}
