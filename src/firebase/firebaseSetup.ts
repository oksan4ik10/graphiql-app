import { initializeApp } from 'firebase/app';
import {
  //GoogleAuthProvider,
  getAuth,
  //signInWithPopup,
  //signInWithEmailAndPassword,
  //createUserWithEmailAndPassword,
  //sendPasswordResetEmail,
  //signOut,
} from 'firebase/auth';
import {
  getFirestore,
  //query,
  //getDocs,
  //collection,
  //where,
  //addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBoMNmzDDro-U-XSYyWivYtmIrM77MhDJ0',
  authDomain: 'graphiql-app-auth.firebaseapp.com',
  projectId: 'graphiql-app-auth',
  storageBucket: 'graphiql-app-auth.appspot.com',
  messagingSenderId: '438893605469',
  appId: '1:438893605469:web:782a43c8afb7242fcb93b4',
  measurementId: 'G-7K8BS3NR9B',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
