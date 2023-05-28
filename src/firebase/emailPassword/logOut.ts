import { signOut } from 'firebase/auth';

import { auth } from '../firebaseSetup';

export default async function logout() {
  signOut(auth);
}
