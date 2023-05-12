import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.notfound}>
      <div className={styles.box}>
        <div className={styles.title}>{t('404-header')}</div>
        <div className={styles.subtitle}>{t('404-message')}</div>
        <div className={styles.error}>{t('404-err')}</div>
        <Link to="/">{t('404text2')}</Link>
      </div>
      <div className={styles.img}></div>
    </div>
  );
}
