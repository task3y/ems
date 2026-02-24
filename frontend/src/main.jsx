import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthContext from './context/authContext.jsx';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <App />
  </AuthContext>
);
