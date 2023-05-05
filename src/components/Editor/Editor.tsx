import CodeMirror from '@uiw/react-codemirror';
import { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { codeEditorSlice } from '../../store/reducers/codeEditReducer';
import { countryAPI } from '../../store/reducers/api/CountryApiReducer';

import style from './Editor.module.css';

export default function Editor() {
  const { strCode } = useAppSelector((state) => state.codeEditReducer);
  const dispatch = useAppDispatch();
  const { saveCode } = codeEditorSlice.actions;

  const [getPlayEditor] = countryAPI.useLazyFetchGetDateCountriesQuery();

  const strCodeExample = `query GetCountry {
    country(code: "BR") {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }`;
  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.outerText;
    dispatch(saveCode(text));
    console.log(strCode);
  }
  async function playCode() {
    const t = await getPlayEditor({ strCode: strCodeExample });
    if (t.data) {
      if (t.data.data) {
        console.log(t.data.data);
      }
    }
  }

  return (
    <div className={style.codeMirror}>
      <CodeMirror
        value={strCode}
        height="60vh"
        basicSetup={{
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: false,
        }}
        onInput={changeInput}
      />
      <button onClick={playCode}>Click</button>
    </div>
  );
}
