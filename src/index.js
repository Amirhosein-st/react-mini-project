import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import App from './components/App/App';

import './index.css';

import './resources/Style/reset.css';
import './resources/Style/reset-minimal.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);

reportWebVitals();