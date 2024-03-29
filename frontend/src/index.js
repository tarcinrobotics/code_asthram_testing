import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AnimLoader from './component/AnimLoader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import './Login.css';

const App = () => {
  const [isSuperuser, setIsSuperuser] = useState(false);
  console.log('isSuperuser:', isSuperuser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsSuperuser={setIsSuperuser} />} />
        {/* Ensure this log statement is showing the correct value */}
      <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<AnimLoader />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();
