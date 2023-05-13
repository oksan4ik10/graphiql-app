import { useState } from 'react';

import styles from './EditorAndResponse.module.css';

import { countryAPI } from '../../store/reducers/api/CountryApiReducer';
import { useAppSelector } from '../../store/store';
import Editor from '../Editor/Editor';
import ResponseSection from '../ResponseSection/ResponseSection';

export default function EditorAndResponse() {
  const [getPlayEditor] = countryAPI.useLazyFetchGetDateCountriesQuery();

  const { strCode, variables, header } = useAppSelector((state) => state.codeEditReducer);

  const [currentResp, setCurrentResp] = useState<{ data: object } | undefined | unknown>(undefined);

  const playCode = async () => {
    const t = await getPlayEditor({ strCode: strCode, varUser: variables, headers: header });
    if (t.status === 'rejected') {
      setCurrentResp(t.error);
    }
    if (t.status === 'fulfilled') {
      setCurrentResp(t.data);
    }
  };

  return (
    <div className={styles.edit_resp_wraper}>
      <Editor buttonFunc={playCode} />
      <ResponseSection resp={currentResp} />
    </div>
  );
}
