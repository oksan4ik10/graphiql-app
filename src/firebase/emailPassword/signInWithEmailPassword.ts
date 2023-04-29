import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebaseSetup';

export default async function logInWithEmailAndPassword(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
}
