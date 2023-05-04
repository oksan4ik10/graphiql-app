import styles from './MainPage.module.css';
import Editor from '../../components/Editor/Editor';
import Docs from '../../components/Docs/Docs';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
// import { useState } from 'react';

export default function MainPage() {
  // const [docsActive, setDocsActive] = useState(false);

  return (
    <div className={styles.main__container}>
      {/* <div>
        <div className={styles.main__docs_btn} onClick={() => setDocsActive(!docsActive)}></div>
      </div> */}
      <ControlPanel></ControlPanel>
      <Docs></Docs>
      <Editor></Editor>
      <h2>Ответ сервера</h2>
    </div>
  );
}
