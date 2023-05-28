import { TField } from './interfaсes';

export default function Type(props: { child: TField }) {
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
          <span>
            {props.child.type.ofType.ofType.ofType
              ? props.child.type.ofType.ofType.ofType.name
              : ''}
          </span>
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
