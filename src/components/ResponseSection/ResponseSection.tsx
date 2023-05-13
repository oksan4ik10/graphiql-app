import styles from './ResponseSection.module.css';

import CodeEditor from '../Utils/CodeEditor/CodeEditor';

interface IResponseSectionProps {
  resp: { data: object } | undefined | unknown;
}

export default function ResponseSection({ resp }: IResponseSectionProps) {
  return (
    <div className={styles.respsec_wrapper}>
      <CodeEditor
        highlightLine="no"
        editable="no"
        lineNumbers="no"
        typeEditor="response"
        height="60vh"
        response={resp ? JSON.stringify(resp) : ''}
      />
    </div>
  );
}
