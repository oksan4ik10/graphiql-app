import { useTranslation } from 'react-i18next';

import styles from './Docs.module.css';
import { useAppSelector } from '../../store/store';
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql/utilities';

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
// console.log(schema);
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
  const docsIsOpen = useAppSelector<boolean>((state) => state.docsIsOpenReducer.docsIsOpen);
  return (
    <>
      <div className={docsIsOpen ? styles.docs__window : styles.docs__window_close}>
        <h3>Docs</h3>
        <span>A GraphQL schema provides a root type for each kind of operation.</span>
        <DocsThree></DocsThree>
      </div>
    </>
  );
}
