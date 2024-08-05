import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='673902641255-9efac8p4u9f3omdj84010nv190vehlje.apps.googleusercontent.com'>
    <React.StrictMode>

      <App />

    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();
