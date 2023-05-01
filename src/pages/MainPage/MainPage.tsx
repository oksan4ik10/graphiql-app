import styles from './MainPage.module.css';
import Editor from '../../components/Editor/Editor';

export default function MainPage() {
  return (
    <div>
      <h1 className={styles.main_h1}>This page is so Main and so super.</h1>
      <Editor></Editor>
    </div>
  );
}
