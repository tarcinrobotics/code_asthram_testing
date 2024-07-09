import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AnimLoader from './component/AnimLoader';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Added Navigate for redirection
import Register from './Register.js';

const App = () => {
  // Remove the useState for isSuperuser if not needed
  
  // Optional: Function to check authentication state, you can replace this with actual authentication logic
  const isAuthenticated = true; // Replace with actual authentication logic
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for '/' can be removed if you're not using it */}
        {/* Route for '/register' stays the same */}
        <Route path="/register" element={<Register />} />
        {/* Route for '/dashboard' */}
        <Route path="/dashboard" element={<AnimLoader />} />
        {/* Redirect '/' to '/dashboard' */}
        <Route path="/" element={<AnimLoader />} />
      </Routes>
    </BrowserRouter>
  );
};

// Service worker registration and other functions remain the same

ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();
