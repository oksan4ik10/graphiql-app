import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.notfound}>
      <h1>{t('404text1')}</h1>
      <Link to="/">{t('404text2')}</Link>
    </div>
  );
}
