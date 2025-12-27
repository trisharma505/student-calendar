import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Set the default theme
document.body.setAttribute('data-theme', 'light');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);