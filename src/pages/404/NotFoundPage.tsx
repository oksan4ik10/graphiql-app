import { Link } from 'react-router-dom';

import './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div>
      <h1>This is probably not what you were looking for.</h1>
      <Link to="/">Press here to return to the Home page</Link>
    </div>
  );
}
