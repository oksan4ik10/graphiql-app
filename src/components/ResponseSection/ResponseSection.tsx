import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ResponseSection.module.css';

import CodeEditor from '../Utils/CodeEditor/CodeEditor';

interface IResponseSectionProps {
  resp: { data: object } | undefined | unknown;
}

export default function ResponseSection({ resp }: IResponseSectionProps) {
  const isError = useRef<boolean>(false);
  const { t } = useTranslation();

  if (resp && !JSON.stringify(resp).includes('errors') && !JSON.stringify(resp).includes('data')) {
    isError.current = true;
  }

  return (
    <div className={styles.respsec_wrapper}>
      <CodeEditor
        highlightLine="no"
        editable="no"
        lineNumbers="no"
        typeEditor="response"
        height="60vh"
        response={
          resp && isError.current
            ? `${t('some error')} ${t('err details')} 
        ${JSON.stringify(resp, null, 2)}`
            : resp
            ? JSON.stringify(resp, null, 2)
            : ''
        }
      />
    </div>
  );
}
