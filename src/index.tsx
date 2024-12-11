import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // переконайся, що 'root' існує в HTML
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);