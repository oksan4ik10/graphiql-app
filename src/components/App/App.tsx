import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.module.css';
import NotFoundPage from '../../pages/404/NotFoundPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import MainPage from '../../pages/MainPage/MainPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="/signin" element={<SignInPage />}></Route>
      <Route path="/main" element={<MainPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
