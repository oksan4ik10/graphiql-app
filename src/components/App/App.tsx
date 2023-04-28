import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

export function App() {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/main" element={<MainPage />} />
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
