import { useTranslation } from 'react-i18next';

import styles from './SignInPage.module.css';

import SignInForm from '../../components/SignInForm/SignInForm';

export default function SignInPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.signin}>
      <h1>{t('have acc sign in title')}</h1>
      <SignInForm />
    </div>
  );
}
