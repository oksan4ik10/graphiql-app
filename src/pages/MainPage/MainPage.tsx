import styles from './MainPage.module.css';

import Docs from '../../components/Docs/Docs';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import EditorAndResponse from '../../components/EditorAndResponse/EditorAndResponse';
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql/utilities';
import { updateDocsIsUploaded } from '../../store/reducers/docsIsUploadedReduser';
import { useAppDispatch } from '../../store/store';
import { useEffect } from 'react';

async function getSchema(endpoint: string) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  const graphqlSchemaObj = buildClientSchema((await response.json()).data);
  try {
    return graphqlSchemaObj;
    // return printSchema(graphqlSchemaObj);
  } finally {
    // console.log('is ok');
  }
}

// const shema = await getSchema('https://countries.trevorblades.com');
// console.log(shema);

export default function MainPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getSchema('https://countries.trevorblades.com').then(() => {
      dispatch(updateDocsIsUploaded(true));
    });
  }, []);

  return (
    <div className={styles.main__container}>
      <ControlPanel></ControlPanel>
      <Docs></Docs>
      <EditorAndResponse />
    </div>
  );
}
