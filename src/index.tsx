import ReactDOM from 'react-dom/client';
import WrappedApp from './components/App/App';
import './localization/i18next';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<WrappedApp />);
