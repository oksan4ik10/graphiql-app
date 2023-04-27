import { NavLink } from 'react-router-dom';

import style from './Logo.module.css';

export default function Logo() {
  return (
    <>
      <div className={style.logo_wrapper}>
        <NavLink to="/">
          <div className={style.logo_inner}></div>
        </NavLink>
      </div>
    </>
  );
}
