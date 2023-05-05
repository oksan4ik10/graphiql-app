import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../firebaseSetup';

export default async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return 'success';
  } catch (err) {
    return (err as Error).message;
  }
}
