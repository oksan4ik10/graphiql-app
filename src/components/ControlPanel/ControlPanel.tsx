import styles from './ControlPanel.module.css';

export default function ControlPanel() {
  return (
    <div className={styles.controlPanel}>
      <div className={styles.docs_btn} onClick={() => console.log('click!')}></div>
      {/* <div className={styles.main__docs_btn} onClick={() => setDocsActive(!docsActive)}></div> */}
    </div>
  );
}
