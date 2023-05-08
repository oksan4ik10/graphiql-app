import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import style from './Nav.module.css';
import Button from '../Utils/Button/Button';
import logout from '../../firebase/emailPassword/logOut';
import returnToDefaultState from '../../store/returnToDefaultState';

export function SignUp() {
  const { t } = useTranslation();

  return (
    <NavLink
      to="/signup"
      className={style.header_nav_item}
      children={({ isActive }) => (
        <Button
          buttonText={t('sign up')}
          buttonType="button"
          buttonStyle={isActive ? 'alternate_back' : ''}
        />
      )}
    />
  );
}

export function SignIn() {
  const { t } = useTranslation();

  return (
    <NavLink
      to="/signin"
      className={style.header_nav_item}
      children={({ isActive }) => (
        <Button
          buttonText={t('sign in')}
          buttonType="button"
          buttonStyle={isActive ? 'alternate_back' : ''}
        />
      )}
    />
  );
}

export function LogOut() {
  const { t } = useTranslation();

  return (
    <NavLink
      to="/"
      className={style.header_nav_item}
      children={({ isActive }) => (
        <Button
          func={() => {
            returnToDefaultState();
            logout();
          }}
          buttonText={t('log out')}
          buttonType="button"
          buttonStyle={isActive ? 'alternate_back' : ''}
        />
      )}
    />
  );
}

export function GoToMain() {
  const { t } = useTranslation();

  return (
    <NavLink
      to="/main"
      className={style.header_nav_item}
      children={({ isActive }) => (
        <Button
          buttonText={t('main')}
          buttonType="button"
          buttonStyle={isActive ? 'alternate_back' : ''}
        />
      )}
    />
  );
}
