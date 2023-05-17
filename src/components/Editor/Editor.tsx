import { useTranslation } from 'react-i18next';
// import { getIntrospectionQuery } from 'graphql/utilities';

import CodeEditor from '../Utils/CodeEditor/CodeEditor';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { codeEditorSlice } from '../../store/reducers/codeEditReducer';

import style from './Editor.module.css';
import { useState } from 'react';

interface IEditorProps {
  buttonFunc: () => void;
}

export default function Editor({ buttonFunc }: IEditorProps) {
  const { t } = useTranslation();

  const [isHidden, setIsHidden] = useState(true);

  const { strCode } = useAppSelector((state) => state.codeEditReducer);
  const dispatch = useAppDispatch();
  const { saveCode } = codeEditorSlice.actions;

  const playCode = () => {
    buttonFunc();
  };

  const editCode = () => {
    function styleStrCode(str: string) {
      const arr = str.split(' ');
      let res = '';
      let tabCount = 0;
      let symbolFirstLine = ' ';
      arr.forEach((item, index) => {
        let checkLetter = true;
        let symbolStr = item;
        if (item === '{') {
          tabCount += 1;
          symbolStr = ' {';
          symbolFirstLine = '\n';
        }
        if (item === '}') {
          tabCount -= 1;
        }
        if (arr[index][0] === '(' || arr[index][0] === '{') {
          checkLetter = false;
        }
        const s = (checkLetter ? `${symbolFirstLine}${' '.repeat(tabCount)}` : '') + symbolStr;
        res = `${res}${s}`;
      });
      return res;
    }

    let s = strCode.replace(/([,:]) /g, `$1`);

    s = s.replace(/([\({])/g, ` $1`);
    s = s.replace(/(})/g, `$1 `);
    s = s.replace(/\s+/g, ' ').trim();
    s = styleStrCode(s).trim();
    s = strCode.replace(/([,:])/g, `$1 `);

    dispatch(saveCode(s));

    //для подстановки слов в редактор кода из схемы

    // const response = await fetch('https://countries.trevorblades.com', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ query: getIntrospectionQuery() }),
    // });
    // const res = await response.json();
    // console.log(res);
  };

  const copyCode = () => {};

  const clickBtnHidden = () => {
    isHidden ? setIsHidden(false) : setIsHidden(true);
  };

  return (
    <div className={style.codeMirror}>
      <div className={style.editor_main}>
        <CodeEditor typeEditor="strCode" height="500px"></CodeEditor>
      </div>
      <div className="buttons">
        <button onClick={playCode} className={style.button}>
          {t('run')}
        </button>
        <button onClick={editCode} className={style.button}>
          {t('prettier')}
        </button>
        <button onClick={copyCode} className={style.button}>
          {t('copy')}
        </button>
      </div>

      <div className={`${style.tabs} ${isHidden ? style.tabs2 : ''} `}>
        <div className={style.tab}>
          <input type="radio" id="tab1" name="tab-group" defaultChecked />
          <label htmlFor="tab1" className={style.tab_title}>
            {t('variables')}
          </label>
          <section className={style.tab_content}>
            <CodeEditor typeEditor="variables" height="20%"></CodeEditor>
          </section>
        </div>
        <div className={style.tab}>
          <input type="radio" id="tab2" name="tab-group" />
          <label htmlFor="tab2" className={style.tab_title}>
            {t('headers')}
          </label>
          <section className={style.tab_content}>
            <CodeEditor typeEditor="header" height="20%"></CodeEditor>
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
    </div>
  );
}
