import styles from './Docs.module.css';
import { useAppSelector } from '../../store/store';

export default function Docs() {
  const docsIsOpen = useAppSelector<boolean>((state) => state.docsIsOpenReducer.docsIsOpen);
  const docsIsUploaded = useAppSelector<boolean>(
    (state) => state.docsIsUploadedReduser.docsIsUploaded
  );

  if (docsIsUploaded) {
    return (
      <>
        <div className={docsIsOpen ? styles.docs__window : styles.docs__window_close}>
          <h3>Docs</h3>
          <span>A GraphQL schema provides a root type for each kind of operation.</span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={docsIsOpen ? styles.docs__window : styles.docs__window_close}>
          <h3>Docs</h3>
          <span>Loading in progress...</span>
        </div>
      </>
    );
  }
}
