import { useTranslation } from 'react-i18next';

import CodeEditor from '../Utils/CodeEditor/CodeEditor';

import style from './Editor.module.css';
import { useState } from 'react';

interface IEditorProps {
  buttonFunc: () => void;
  //СТРОКА НИЖЕ - ПРОП НА ВРЕМЯ ТЕСТИРОВАНИЯ
  testStrCode: object;
}

export default function Editor({ buttonFunc, testStrCode }: IEditorProps) {
  const { t } = useTranslation();

  const [isHidden, setIsHidden] = useState(true);
  const [isVarsChecked, setIsVarsChecked] = useState<boolean>(true);
  const [isHeadsChecked, setIsHeadsChecked] = useState<boolean>(false);

  const toggleTabChecked = (tabID: string) => {
    if (tabID === 'tab1') {
      setIsHeadsChecked(false);
      setIsVarsChecked(true);
    } else if (tabID === 'tab2') {
      setIsVarsChecked(false);
      setIsHeadsChecked(true);
    }
  };

  const playCode = () => {
    buttonFunc();
  };

  const clickBtnHidden = () => {
    isHidden ? setIsHidden(false) : setIsHidden(true);
  };

  return (
    <div className={style.codeMirror}>
      <CodeEditor typeEditor="strCode" height="60vh"></CodeEditor>
      <button onClick={playCode} className={style.button}>
        {t('run')}
      </button>
      <div className={`${style.tabs} ${isHidden ? style.tabs2 : ''} `}>
        <div className={style.tab}>
          <input
            type="radio"
            id="tab1"
            name="tab-group"
            checked={isVarsChecked}
            onChange={() => {}}
          />
          <label
            htmlFor="tab1"
            className={style.tab_title}
            onClick={() => toggleTabChecked('tab1')}
          >
            {t('variables')}
          </label>
          <section className={style.tab_content}>
            <CodeEditor typeEditor="variables" height="50px"></CodeEditor>
          </section>
        </div>
        <div className={style.tab}>
          <input
            type="radio"
            id="tab2"
            name="tab-group"
            checked={isHeadsChecked}
            onChange={() => {}}
          />
          <label
            htmlFor="tab2"
            className={style.tab_title}
            onClick={() => toggleTabChecked('tab2')}
          >
            {t('headers')}
          </label>
          <section className={style.tab_content}>
            <CodeEditor typeEditor="header" height="50px"></CodeEditor>
          </section>
        </div>
        <button
          className={`${style.btnHidden} ${isHidden ? style.active : ''} `}
          onClick={clickBtnHidden}
        >
          <svg
            height="1em"
            viewBox="0 0 14 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="graphiql-chevron-icon"
            aria-hidden="true"
          >
            <title>chevron down icon</title>
            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5"></path>
          </svg>
        </button>
      </div>
      <h4>Code:{testStrCode.toString()}</h4>
    </div>
  );
}
