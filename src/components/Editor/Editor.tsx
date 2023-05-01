import CodeMirror from '@uiw/react-codemirror';
import { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { codeEditorSlice } from '../../store/reducers/codeEditReducer';

export default function Editor() {
  const { strCode } = useAppSelector((state) => state.codeEditReducer);
  const dispatch = useAppDispatch();
  const { saveCode } = codeEditorSlice.actions;

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.outerText;
    dispatch(saveCode(text));
    console.log(strCode);
  }

  return (
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
  );
}
