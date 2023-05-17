import styles from './Docs.module.css';
import { useAppDispatch } from '../../store/store';
import { updateDocsField } from '../../store/reducers/docsFieldReduser';
import { TField, TArgs } from './interfaсes';

export default function Arguments(props: { child: TField }) {
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

function ArgumentType(props: TArgs) {
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
