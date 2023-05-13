import { useState } from 'react';

import styles from './EditorAndResponse.module.css';

import { countryAPI } from '../../store/reducers/api/CountryApiReducer';
import { useAppSelector } from '../../store/store';
import Editor from '../Editor/Editor';
import ResponseSection from '../ResponseSection/ResponseSection';

export default function EditorAndResponse() {
  const [getPlayEditor, { error, data }] = countryAPI.useLazyFetchGetDateCountriesQuery();

  const { strCode, variables, header } = useAppSelector((state) => state.codeEditReducer);

  const [currentResp, setCurrentResp] = useState<{ data: object } | undefined | unknown>(undefined);

  const strCodeExample = `query GetCountry($t:ID!) {
    country(code:$t) {
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

  const v = `{
    "t":"BR"
  }`;

  const playCode = async () => {
    const t = await getPlayEditor({ strCode: strCode, varUser: variables, headers: header });
    console.log(t);
    console.log(error, data);
    console.log(currentResp);

    if (t.status === 'rejected') {
      setCurrentResp(t.error);
    }
    if (t.status === 'fulfilled') {
      setCurrentResp(data);
    }
  };

  return (
    <div className={styles.edit_resp_wraper}>
      <Editor buttonFunc={playCode} testStrCode={strCode.toString()} />
      <ResponseSection resp={currentResp} />
    </div>
  );
}
