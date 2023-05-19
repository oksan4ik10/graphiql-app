import { useTranslation } from 'react-i18next';

import styles from './SignUpPage.module.css';

import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function SignUpPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.signup}>
      <h1 className={styles.title}>{t('no acc sign up title')}</h1>
      <SignUpForm />
    </div>
  );
}
