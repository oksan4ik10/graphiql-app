import { useTranslation } from 'react-i18next';

import styles from './Docs.module.css';

import { useAppSelector } from '../../store/store';
import { getIntrospectionQuery, buildClientSchema } from 'graphql/utilities';

fetch('https://countries.trevorblades.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: getIntrospectionQuery() }),
})
  .then((res) => res.json())
  .then((res) => console.log(buildClientSchema(res.data)));

export default function Docs() {
  const docsIsOpen = useAppSelector<boolean>((state) => state.docsIsOpenReducer.docsIsOpen);

  const { t } = useTranslation();

  return (
    <>
      <div className={docsIsOpen ? styles.docs__window : styles.docs__window_close}>
        <h3>{t('docs')}</h3>
        <span>A GraphQL schema provides a root type for each kind of operation.</span>
      </div>
    </>
  );
}
