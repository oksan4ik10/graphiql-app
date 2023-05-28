import { lazy, Suspense } from 'react';

import styles from './MainPage.module.css';

import ControlPanel from '../../components/ControlPanel/ControlPanel';
import EditorAndResponse from '../../components/EditorAndResponse/EditorAndResponse';
import Loading from '../../components/Loading/Loading';

const Docs = lazy(() => import('../../components/Docs/Docs'));

export default function MainPage() {
  return (
    <div className={styles.main__container}>
      <ControlPanel></ControlPanel>
      <Suspense fallback={<Loading />}>
        <Docs></Docs>
      </Suspense>
      <EditorAndResponse />
    </div>
  );
}
