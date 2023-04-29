import SignUpForm from '../../components/SignUpForm/SignUpForm';
import styles from './SignUpPage.module.css';

export default function SignUpPage() {
  return (
    <div className={styles.signup}>
      <h1>{"Don't have an account yet? Sign up and get going!"}</h1>
      <SignUpForm />
    </div>
  );
}
