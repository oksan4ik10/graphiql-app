import { countryAPI } from '../../store/reducers/api/CountryApiReducer';
import CodeEditor from '../Utils/CodeEditor/CodeEditor';

import style from './Editor.module.css';

export default function Editor() {
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
      <CodeEditor typeEditor="strCode" height="60vh"></CodeEditor>
      <button onClick={playCode}>Click</button>
    </div>
  );
}
