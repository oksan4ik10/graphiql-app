import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  return (
    <>
      <div className={styles.welcome}>
        <h1>Welcome! This Welcome page welcomes you!</h1>
        <div className={styles.test}>
          Sticky header test. Delete after filling the page with content!
        </div>
      </div>
    </>
  );
}
