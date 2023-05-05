import { countryAPI } from '../../store/reducers/api/CountryApiReducer';
import CodeEditor from '../Utils/CodeEditor/CodeEditor';
import { useAppSelector } from '../../store/store';

import style from './Editor.module.css';

export default function Editor() {
  const [getPlayEditor] = countryAPI.useLazyFetchGetDateCountriesQuery();

  const { strCode } = useAppSelector((state) => state.codeEditReducer);

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
      <div className={style.tabs}>
        <div className={style.tab}>
          <input type="radio" id="tab1" name="tab-group" checked onChange={() => {}} />
          <label htmlFor="tab1" className={style.tab_title}>
            Variables
          </label>
          <section className={style.tab_content}>
            <CodeEditor typeEditor="variables" height="50px"></CodeEditor>
          </section>
        </div>
        <div className={style.tab}>
          <input type="radio" id="tab2" name="tab-group" onChange={() => {}} />
          <label htmlFor="tab2" className={style.tab_title}>
            Header
          </label>
          <section className={style.tab_content}>
            <CodeEditor typeEditor="header" height="50px"></CodeEditor>
          </section>
        </div>
      </div>
      <h4>Code:{strCode}</h4>
    </div>
  );
}
