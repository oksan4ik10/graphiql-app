import styles from './ResponseSection.module.css';

interface IResponseSectionProps {
  resp: { data: object } | null;
}

export default function ResponseSection({ resp }: IResponseSectionProps) {
  return <div className={styles.respsec_wrapper}>{resp && <div>{JSON.stringify(resp)}</div>}</div>;
}
