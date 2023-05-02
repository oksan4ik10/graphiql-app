import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from './App.module.css';
import NotFoundPage from '../../pages/404/NotFoundPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import MainPage from '../../pages/MainPage/MainPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import store from '../../store/store';
import { Provider } from 'react-redux';
import { auth } from '../../firebase/firebaseSetup';
import loader from '../../assets/balls.gif';

export function App() {
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <>
        <Header />
        <main className={styles.wrapper}>
          <img src={loader} alt="loader" />
        </main>
        <Footer />
      </>
    );
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          {user ? (
            <Route path="/signup" element={<Navigate to="/main" replace />} />
          ) : (
            <Route path="/signup" element={<SignUpPage />} />
          )}
          {user ? (
            <Route path="/signin" element={<Navigate to="/main" replace />} />
          ) : (
            <Route path="/signin" element={<SignInPage />} />
          )}
          {!user ? (
            <Route path="/main" element={<Navigate to="/signin" replace />} />
          ) : (
            <Route path="/main" element={<MainPage />} />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
