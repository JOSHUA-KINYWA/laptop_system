// ===== src/main.jsx or src/index.jsx =====
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/authcontext';
import { Toaster } from 'react-hot-toast';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
