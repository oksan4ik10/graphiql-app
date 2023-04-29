import SignInForm from '../../components/SignInForm/SignInForm';
import styles from './SignInPage.module.css';

export default function SignInPage() {
  return (
    <div className={styles.signin}>
      <h1>Aready have an account? Sign in and get going!</h1>
      <SignInForm />
    </div>
  );
}
