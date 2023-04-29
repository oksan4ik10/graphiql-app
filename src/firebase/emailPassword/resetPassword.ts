import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../firebaseSetup';

export default async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
}
