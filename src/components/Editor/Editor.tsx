import CodeMirror from '@uiw/react-codemirror';
import { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { codeEditorSlice } from '../../store/reducers/codeEditReducer';
import { countryAPI } from '../../store/reducers/api/CountryApiReducer';

import Button from '../Utils/Button/Button';
import { Loader } from '../Loader/Loader';
import style from './Editor.module.css';

export default function Editor() {
  const { strCode } = useAppSelector((state) => state.codeEditReducer);
  const dispatch = useAppDispatch();
  const { saveCode } = codeEditorSlice.actions;

  const { isLoading, data, error } = countryAPI.useFetchGetDateCountriesQuery({
    strCode: `query GetCountry {
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
    }`,
  });
  console.log(isLoading, data, error);

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.outerText;
    dispatch(saveCode(text));
    console.log(strCode);
  }
  function playCode() {
    console.log(23);
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
      <Button func={playCode} buttonType="button" buttonText="&#9658;" buttonWidth="100%" />
      {isLoading && <Loader />}
    </div>
  );
}
