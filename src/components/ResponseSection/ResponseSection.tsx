import styles from './ResponseSection.module.css';

interface IResponseSectionProps {
  resp: { data: object } | null;
}

export default function ResponseSection({ resp }: IResponseSectionProps) {
  return (
    <div className={styles.respsec_wrapper}>
      <h2>Response</h2>
      {resp && <div>{JSON.stringify(resp)}</div>}
    </div>
  );
}
