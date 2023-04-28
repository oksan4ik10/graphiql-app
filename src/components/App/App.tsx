import { BrowserRouter, Route, Routes } from 'react-router-dom';

import style from './App.module.css';
import NotFoundPage from '../../pages/404/NotFoundPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import MainPage from '../../pages/MainPage/MainPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export function App() {
  return (
    <>
      <Header />
      <main className={style.wrapper}>
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
