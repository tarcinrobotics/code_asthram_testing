import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AnimLoader from './component/AnimLoader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import './Login.css';
import { AuthProvider } from './AuthProvider.js';

const App = () => {
  const [isSuperuser, setIsSuperuser] = useState(false);
  console.log('isSuperuser:', isSuperuser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AuthProvider> {/* Wrap the Routes with the AuthProvider */}
            <Login setIsSuperuser={setIsSuperuser} />
          </AuthProvider>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<AnimLoader />} />
      </Routes>
    </BrowserRouter>
  );
};

// Function to register service workers
// Function to register service workers and background sync
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered: ', registration);

          // Register for background sync (if available)
          if ('sync' in registration) {
            registration.sync.register('sync-data')
              .then(() => console.log('Background sync registered'))
              .catch(err => console.error('Background sync registration failed', err));
          }
        })
        .catch(registrationError => {
          console.log('Service Worker registration failed: ', registrationError);
        });
    });
  }
}



ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();

// Call the registerServiceWorker function to initialize service worker registration
registerServiceWorker();
