import CodeMirror from '@uiw/react-codemirror';

export default function Editor() {
  return (
    <CodeMirror
      value="console.log('hello world!');"
      height="60vh"
      basicSetup={{
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
      }}
    />
  );
}
