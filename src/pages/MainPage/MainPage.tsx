import styles from './MainPage.module.css';

import Docs from '../../components/Docs/Docs';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import EditorAndResponse from '../../components/EditorAndResponse/EditorAndResponse';

export default function MainPage() {
  return (
    <div className={styles.main__container}>
      <ControlPanel></ControlPanel>
      <Docs></Docs>
      <EditorAndResponse />
    </div>
  );
}
