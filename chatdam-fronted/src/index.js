import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Principal Pages 

import App from './Page';
import Login from './Pages/user/login'
import GitHubResponse from './Pages/Extras/githubresponse.js'

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Router>
      <Routes>
        {/* Definición de rutas */}
        <Route path="/" element={<App />} />
        <Route path="/chatdam/login" element={<Login />} />
        <Route path="/chatdam/login/method/github" element={<GitHubResponse />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* Ruta para manejar páginas no encontradas (404) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
