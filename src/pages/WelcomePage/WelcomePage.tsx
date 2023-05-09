import { useTranslation } from 'react-i18next';

import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.welcome}>
        <h1>{t('welcome title')}</h1>
        <div className={styles.test}>
          Sticky header test. Delete after filling the page with content!
        </div>
      </div>
    </>
  );
}
