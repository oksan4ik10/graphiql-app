import styles from './MainPage.module.css';

import Docs from '../../components/Docs/Docs';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import EditorAndResponse from '../../components/EditorAndResponse/EditorAndResponse';
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
      <EditorAndResponse />
    </div>
  );
}
