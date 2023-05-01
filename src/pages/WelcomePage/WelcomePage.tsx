import style from './WelcomePage.module.css';

import Button from '../../components/Utils/Button/Button';
import { increment } from '../../store/reducers/testReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';

export default function WelcomePage() {
  const count = useAppSelector((state) => state.testReducer.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <h1>Welcome! The count is {count} now.</h1>
        <div className={style.test}>
          Sticky header test. Delete after filling the page with content!
        </div>
      </div>
      <Button buttonText="Increment!" buttonType="button" func={() => dispatch(increment())} />
    </>
  );
}
