import CodeMirror from '@uiw/react-codemirror';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { codeEditorSlice } from '../../../store/reducers/codeEditReducer';

interface IPropsEditor {
  typeEditor: string;
  height: string;
}

export default function CodeEditor(props: IPropsEditor) {
  const { typeEditor, height } = props;

  const { strCode, variables, header } = useAppSelector((state) => state.codeEditReducer);
  const dispatch = useAppDispatch();
  const { saveCode, saveVariables, saveHeader } = codeEditorSlice.actions;

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.outerText;
    if (typeEditor === 'header') dispatch(saveHeader(text));
    else if (typeEditor === 'variables') dispatch(saveVariables(text));
    else dispatch(saveCode(text));
    console.log(strCode);
  }

  return (
    <>
      <CodeMirror
        value={typeEditor === 'header' ? header : typeEditor === 'variables' ? variables : strCode}
        height={height}
        basicSetup={{
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: false,
        }}
        onInput={changeInput}
      />
    </>
  );
}
