import { useTranslation } from 'react-i18next';

import CodeEditor from '../Utils/CodeEditor/CodeEditor';

import style from './Editor.module.css';

interface IEditorProps {
  buttonFunc: () => void;
  //СТРОКА НИЖЕ - ПРОП НА ВРЕМЯ ТЕСТИРОВАНИЯ
  testStrCode: object;
}

export default function Editor({ buttonFunc, testStrCode }: IEditorProps) {
  const { t } = useTranslation();

  const playCode = () => {
    buttonFunc();
  };

  return (
    <div className={style.codeMirror}>
      <CodeEditor typeEditor="strCode" height="60vh"></CodeEditor>
      <button onClick={playCode}>Click</button>
      <div className={style.tabs}>
        <div className={style.tab}>
          <input type="radio" id="tab1" name="tab-group" checked onChange={() => {}} />
          <label htmlFor="tab1" className={style.tab_title}>
            {t('variables')}
          </label>
          <section className={style.tab_content}>
            <CodeEditor typeEditor="variables" height="50px"></CodeEditor>
          </section>
        </div>
        <div className={style.tab}>
          <input type="radio" id="tab2" name="tab-group" onChange={() => {}} />
          <label htmlFor="tab2" className={style.tab_title}>
            {t('headers')}
          </label>
          <section className={style.tab_content}>
            <CodeEditor typeEditor="header" height="50px"></CodeEditor>
          </section>
        </div>
      </div>
      <h4>Code:{testStrCode.toString()}</h4>
    </div>
  );
}
