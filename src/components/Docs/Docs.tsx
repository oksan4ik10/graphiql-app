// import { useTranslation } from 'react-i18next';

import styles from './Docs.module.css';
import { useAppSelector } from '../../store/store';
import { getIntrospectionQuery } from 'graphql/utilities';
import { useState } from 'react';

type OneType = {
  kind: string;
  name: string;
  description: string;
  fields: Array<string>;
  inputFields: null | Array<object>;
};

async function getSchema(endpoint: string) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(JSON.stringify(res.data, null, '\t'));
      return res.data;
      // return JSON.stringify(res.data, null, '\t');
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

types.forEach((element: OneType) => {
  if (element.name[0] !== '_') {
    objectType[element.name] = element;
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Type(props: any) {
  if (props.child.type.kind === 'OBJECT' || props.child.type.kind === 'SCALAR') {
    return <>{props.child.type.name}</>;
  } else {
    if (props.child.type.ofType.kind === 'LIST') {
      return (
        <>
          <span>[</span>
          <span>{props.child.type.ofType.ofType.ofType.name}</span>
          <span>!]</span>
        </>
      );
    } else if (
      props.child.type.ofType.kind === 'SCALAR' ||
      props.child.type.ofType.kind === 'OBJECT'
    ) {
      return <>{props.child.type.ofType.name}</>;
    } else {
      return <></>;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Arguments(props: any) {
  if (props.child.args.length > 0) {
    return (
      <>
        <span>(</span>
        <span>{props.child.args[0].name}: </span>
        <ArgumentType args={props.child.args[0].type}></ArgumentType>
        <span>): </span>
      </>
    );
  } else {
    return <span>:</span>;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArgumentType(props: any) {
  console.log(props.args);
  if (props.args.name && props.args.kind === 'INPUT_OBJECT') {
    //добавить обработку клика!
    //перевести useState в состояние!
    return (
      <>
        <span className={styles.link}>{props.args.name}</span>
        <span>{'={}'}</span>
      </>
    );
  } else if (props.args.name && props.args.kind === 'SCALAR') {
    return <span className={styles.link}>{props.args.name}</span>;
  } else {
    return <span className={styles.link}>{props.args.ofType.name}</span>;
  }
}

function DocsThree() {
  const [curValue, setCurValue] = useState('');
  const curField = useAppSelector<string>((state) => state.docsFieldReduser.docsField);
  console.log(curField);

  if (!curValue) {
    return (
      <div>
        <div className={styles.title}>Docs</div>
        query:{' '}
        <span
          className={styles.link}
          onClick={() => {
            setCurValue('Query');
          }}
        >
          {root}
        </span>
      </div>
    );
  } else {
    let children = [];
    if (objectType[curValue].kind === 'OBJECT') {
      children = objectType[curValue].fields;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const listItems = children.map((child: any) => (
        <div key={child.name}>
          <span>{child.name}</span>
          <span>
            <Arguments child={child}></Arguments>
          </span>
          <span
            className={styles.link}
            onClick={() => {
              if (child.type.kind === 'OBJECT') {
                setCurValue(child.type.name);
              } else if (
                child.type.ofType.kind === 'SCALAR' ||
                child.type.ofType.kind === 'OBJECT'
              ) {
                setCurValue(child.type.ofType.name);
              } else if (child.type.ofType.kind === 'LIST') {
                setCurValue(child.type.ofType.ofType.ofType.name);
              }
            }}
          >
            <Type child={child}></Type>
          </span>
        </div>
      ));
      return (
        <>
          <div className={styles.title}>{curValue}</div>
          <div>{listItems}</div>
        </>
      );
    } else if (objectType[curValue].kind === 'SCALAR') {
      return (
        <>
          <div className={styles.title}>{curValue}</div>
          <span>{objectType[curValue].description}</span>
        </>
      );
    } else {
      return <span>Any</span>;
    }
  }
}

// const schemaAst = buildASTSchema(parse(printSchema(buildClientSchema(schema))));

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
