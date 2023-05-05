import { useState } from 'react';

import styles from './EditorAndResponse.module.css';

import { countryAPI } from '../../store/reducers/api/CountryApiReducer';
import { useAppSelector } from '../../store/store';
import Editor from '../Editor/Editor';
import ResponseSection from '../ResponseSection/ResponseSection';

export default function EditorAndResponse() {
  const [getPlayEditor] = countryAPI.useLazyFetchGetDateCountriesQuery();

  const { strCode } = useAppSelector((state) => state.codeEditReducer);
  const [currentResp, setCurrentResp] = useState<{ data: object } | null>(null);

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

  const playCode = async () => {
    const t = await getPlayEditor({ strCode: strCodeExample });
    if (t.data) {
      if (t.data.data) {
        console.log(t.data.data);
        setCurrentResp(t.data.data);
      }
    }
  };

  return (
    <div className={styles.edit_resp_wraper}>
      <Editor buttonFunc={playCode} testStrCode={strCode.toString()} />
      <ResponseSection resp={currentResp} />
    </div>
  );
}
