import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app.css';
import { NotificationContextProvider } from './store/notification-context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NotificationContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NotificationContextProvider>
);
