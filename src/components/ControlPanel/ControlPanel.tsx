import styles from './ControlPanel.module.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { updateDocsIsOpen } from '../../store/reducers/docsIsOpenReducer';

export default function ControlPanel() {
  const dispatch = useAppDispatch();
  const docsIsOpen = useAppSelector<boolean>((state) => state.docsIsOpenReducer.docsIsOpen);

  return (
    <div className={styles.controlPanel}>
      <div
        className={styles.docs_btn}
        onClick={() => dispatch(updateDocsIsOpen(!docsIsOpen))}
      ></div>
    </div>
  );
}
