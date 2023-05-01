import CodeMirror from '@uiw/react-codemirror';
import { ChangeEvent, useState } from 'react';

export default function Editor() {
  const [value, setValue] = useState('');

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.outerText;
    setValue(text);
    console.log(value);
  }

  return (
    <CodeMirror
      value={value}
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
