import styles from './Docs.module.css';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { getIntrospectionQuery } from 'graphql/utilities';
import { updateDocsField } from '../../store/reducers/docsFieldReduser';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

type TOneType = {
  kind: string;
  name: string;
  description: string;
  fields: Array<string>;
  inputFields: null | Array<object>;
};

type TObjectType = {
  [word: string]: TOneType;
};

type TPropsType = {
  child: {
    type: {
      kind: string;
      name: unknown;
      ofType: {
        ofType: {
          name:
            | string
            | number
            | boolean
            | ReactElement<unknown, string | JSXElementConstructor<unknown>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
          ofType: {
            name:
              | string
              | number
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<unknown>>
              | ReactFragment
              | ReactPortal
              | null
              | undefined;
          };
        };
        kind: string;
        name: unknown;
      };
    };
  };
};

type TArgs = {
  name: string;
  type: object;
};

type TArgumentTypeProps = {
  args: {
    name?:
      | string
      | number
      | boolean
      | ReactFragment
      | ReactElement<unknown, string | JSXElementConstructor<unknown>>
      | null
      | undefined;
    kind?: string;
    ofType?: {
      name:
        | string
        | number
        | boolean
        | ReactFragment
        | ReactElement<unknown, string | JSXElementConstructor<unknown>>
        | null
        | undefined;
    };
  };
};

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
const objectType: TObjectType = {};

types.forEach((element: TOneType) => {
  if (element.name[0] !== '_') {
    objectType[element.name] = element;
  }
});

function Type(props: TPropsType) {
  if (
    props.child.type.kind === 'OBJECT' ||
    props.child.type.kind === 'SCALAR' ||
    props.child.type.kind === 'INPUT_OBJECT'
  ) {
    return <>{props.child.type.name}</>;
  } else if (props.child.type.kind === 'LIST') {
    return (
      <>
        <span>[</span>
        <span>{props.child.type.ofType.ofType.name}</span>
        <span>!]</span>
      </>
    );
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
      props.child.type.ofType.kind === 'OBJECT' ||
      props.child.type.ofType.kind === 'INPUT_OBJECT'
    ) {
      return <>{props.child.type.ofType.name}</>;
    } else {
      return <>!!!</>;
    }
  }
}

function Arguments(props: { child: { args: Array<TArgs> } }) {
  if (props.child.args && props.child.args.length > 0) {
    return (
      <>
        <span>(</span>
        <span>{props.child.args[0].name}: </span>
        <ArgumentType args={props.child.args[0].type}></ArgumentType>
        <span>): </span>
      </>
    );
  } else {
    return <span>: </span>;
  }
}

function ArgumentType(props: TArgumentTypeProps) {
  const dispatch = useAppDispatch();
  if (props.args.name && props.args.kind === 'INPUT_OBJECT') {
    return (
      <>
        <span
          className={styles.link}
          onClick={() => {
            dispatch(updateDocsField(props.args.name as string));
          }}
        >
          {props.args.name}
        </span>
        <span>{'={}'}</span>
      </>
    );
  } else if (props.args.name && props.args.kind === 'SCALAR') {
    return (
      <span
        className={styles.link}
        onClick={() => {
          dispatch(updateDocsField(props.args.name as string));
        }}
      >
        {props.args.name}
      </span>
    );
  } else {
    return (
      <span
        className={styles.link}
        onClick={() => {
          dispatch(updateDocsField(props.args.ofType?.name as string));
        }}
      >
        {props.args.ofType?.name as string}
      </span>
    );
  }
}

function DocsThree() {
  const curField = useAppSelector<string>((state) => state.docsFieldReduser.docsField);
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
          }}
        >
          {root}
        </span>
      </div>
    );
  } else {
    let children: object[] | string[] = [];
    if (objectType[curField].kind === 'OBJECT') {
      children = objectType[curField].fields;
      // console.log('children1', children);
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
                dispatch(updateDocsField(child.type.name));
              } else if (
                child.type.ofType.kind === 'SCALAR' ||
                child.type.ofType.kind === 'OBJECT'
              ) {
                dispatch(updateDocsField(child.type.ofType.name));
              } else if (child.type.ofType.kind === 'LIST') {
                dispatch(updateDocsField(child.type.ofType.ofType.ofType.name));
              }
            }}
          >
            <Type child={child}></Type>
          </span>
        </div>
      ));
      return (
        <>
          <div className={styles.title}>{curField}</div>
          <div>{listItems}</div>
        </>
      );
    } else if (objectType[curField].kind === 'SCALAR') {
      return (
        <>
          <div className={styles.title}>{curField}</div>
          <span>{objectType[curField].description}</span>
        </>
      );
    } else if (objectType[curField].kind === 'INPUT_OBJECT') {
      children = objectType[curField].inputFields as object[];
      // console.log('children2', children);
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
              if (child.type.kind === 'SCALAR' || child.type.kind === 'INPUT_OBJECT') {
                dispatch(updateDocsField(child.type.name));
              } else if (child.type.kind === 'LIST') {
                dispatch(updateDocsField(child.type.ofType.ofType.name));
              }
            }}
          >
            <Type child={child}></Type>
          </span>
        </div>
      ));
      return (
        <>
          <div className={styles.title}>{curField}</div>
          <div>{listItems}</div>
        </>
      );
    } else {
      return <>???</>;
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
