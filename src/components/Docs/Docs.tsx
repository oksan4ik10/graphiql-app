import { useTranslation } from 'react-i18next';

import styles from './Docs.module.css';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { useEffect } from 'react';
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql/utilities';
import { updateDocsIsUploaded } from '../../store/reducers/docsIsUploadedReduser';

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
  }
}

const schema = await getSchema('https://countries.trevorblades.com');
console.log(schema);
// console.log(schema?.getTypeMap()); //получить все типы

function DocsThree() {
  const root = schema?.getQueryType();
  const rootFieldsObj = schema?.getQueryType()?.getFields() as object;
  const rootFieldsKeys = Object.keys(rootFieldsObj);
  // const rootFieldsValues = Object.values(rootFieldsObj);
  // console.log(schema?.getQueryType()?.getFields().continent);
  // console.log(rootFieldsValues);

  const listItems = rootFieldsKeys.map((item) => <li key={item}>{item}</li>);
  console.log(listItems);

  const { t } = useTranslation();

  return (
    <ul>
      <>
        {root?.toString()}
        {listItems}
      </>
    </ul>
  );
}

export default function Docs() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getSchema('https://countries.trevorblades.com').then(() => {
      dispatch(updateDocsIsUploaded(true));
    });
  }, []);

  const docsIsOpen = useAppSelector<boolean>((state) => state.docsIsOpenReducer.docsIsOpen);
  const docsIsUploaded = useAppSelector<boolean>(
    (state) => state.docsIsUploadedReduser.docsIsUploaded
  );

  if (docsIsUploaded) {
    return (
      <>
        <div className={docsIsOpen ? styles.docs__window : styles.docs__window_close}>
          <h3>Docs</h3>
          <span>A GraphQL schema provides a root type for each kind of operation.</span>
          <DocsThree></DocsThree>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={docsIsOpen ? styles.docs__window : styles.docs__window_close}>
          <h3>Docs</h3>
          <span>Loading in progress...</span>
        </div>
      </>
    );
  }
}
