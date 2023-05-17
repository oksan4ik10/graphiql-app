import styles from './Docs.module.css';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { getIntrospectionQuery } from 'graphql/utilities';
import { updateDocsField } from '../../store/reducers/docsFieldReduser';
import { addField, removeField } from '../../store/reducers/docsFieldsListReduser';
import Type from './Type';
import Arguments from './Arguments';
import { TOneType, TField } from './interfaсes';

async function getSchema(endpoint: string) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  try {
    return response;
  } finally {
  }
}

const schema = await getSchema('https://countries.trevorblades.com');
const root = schema.__schema.queryType.name;
const types = schema.__schema.types;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const objectType: any = {};

types.forEach((element: TOneType) => {
  if (element.name[0] !== '_') {
    objectType[element.name] = element;
  }
});

function DocsThree() {
  const curField = useAppSelector<string>((state) => state.docsFieldReduser.docsField);
  const fieldsList = useAppSelector<string[]>(
    (state) => state.docsFieldsListReduser.docsFieldsList
  );
  const prevField = fieldsList[fieldsList.length - 1] ? fieldsList[fieldsList.length - 1] : '';
  const dispatch = useAppDispatch();

  if (!curField) {
    return (
      <div>
        <div className={styles.title}>Docs</div>
        query:{' '}
        <span
          className={styles.link}
          onClick={() => {
            dispatch(updateDocsField('Query'));
            dispatch(addField(curField));
          }}
        >
          {root}
        </span>
      </div>
    );
  } else {
    if (objectType[curField].kind === 'OBJECT') {
      const children = objectType[curField].fields;
      const listItems = children.map((child: TField) => (
        <div key={child.name}>
          <span>{child.name}</span>
          <span>
            <Arguments child={child}></Arguments>
          </span>
          <span
            className={styles.link}
            onClick={() => {
              if (child.type.kind === 'OBJECT') {
                dispatch(updateDocsField(child.type.name));
                dispatch(addField(curField));
              } else if (
                child.type.ofType.kind === 'SCALAR' ||
                child.type.ofType.kind === 'OBJECT'
              ) {
                dispatch(updateDocsField(child.type.ofType.name as string));
                dispatch(addField(curField));
              } else if (child.type.ofType.kind === 'LIST') {
                dispatch(
                  updateDocsField(
                    child.type.ofType.ofType.ofType ? child.type.ofType.ofType.ofType.name : ''
                  )
                );
                dispatch(addField(curField));
              }
            }}
          >
            <Type child={child}></Type>
          </span>
        </div>
      ));
      return (
        <>
          <div
            className={styles.back}
            onClick={() => {
              dispatch(removeField());
              prevField ? dispatch(updateDocsField(prevField)) : dispatch(updateDocsField(''));
            }}
          >
            <div className={styles.arrow}></div>
            {fieldsList.length > 1 ? prevField : 'Docs'}
          </div>
          <div className={styles.title}>{curField}</div>
          <div>{listItems}</div>
        </>
      );
    } else if (objectType[curField].kind === 'SCALAR') {
      return (
        <>
          <div
            className={styles.back}
            onClick={() => {
              dispatch(removeField());
              prevField ? dispatch(updateDocsField(prevField)) : dispatch(updateDocsField(''));
            }}
          >
            <div className={styles.arrow}></div>
            {fieldsList.length > 1 ? prevField : 'Docs'}
          </div>
          <div className={styles.title}>{curField}</div>
          <span>{objectType[curField].description}</span>
        </>
      );
    } else if (objectType[curField].kind === 'INPUT_OBJECT') {
      const children = objectType[curField].inputFields;
      const listItems = children.map((child: TField) => (
        <div key={child.name}>
          <span>{child.name}</span>
          <span>
            <Arguments child={child}></Arguments>
          </span>
          <span
            className={styles.link}
            onClick={() => {
              if (child.type.kind === 'SCALAR' || child.type.kind === 'INPUT_OBJECT') {
                dispatch(updateDocsField(child.type.name));
                dispatch(addField(curField));
              } else if (child.type.kind === 'LIST') {
                dispatch(updateDocsField(child.type.ofType.ofType.name as string));
                dispatch(addField(curField));
              }
            }}
          >
            <Type child={child}></Type>
          </span>
        </div>
      ));
      return (
        <>
          <div
            className={styles.back}
            onClick={() => {
              dispatch(removeField());
              prevField ? dispatch(updateDocsField(prevField)) : dispatch(updateDocsField(''));
            }}
          >
            <div className={styles.arrow}></div>
            {fieldsList.length > 1 ? prevField : 'Docs'}
          </div>
          <div className={styles.title}>{curField}</div>
          <div>{listItems}</div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default function Docs() {
  const docsIsOpen = useAppSelector<boolean>((state) => state.docsIsOpenReducer.docsIsOpen);
  return (
    <>
      <div className={docsIsOpen ? styles.docs__window : styles.docs__window_close}>
        <DocsThree></DocsThree>
      </div>
    </>
  );
}
