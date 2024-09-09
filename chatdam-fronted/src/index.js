import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Principal Pages
import App from './Page';
import Login from './Pages/user/login';
import GitHubResponse from './Pages/Extras/githubresponse.js';
import Dashboard from './Pages/user/dashboard.jsx';
import SearchUser from './Pages/user/SearchUser.jsx'
import { UserProvider, useUser } from './Pages/user/userContext.js'; // Importa el proveedor de contexto

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

function AppRoutes() {
  const { user } = useUser(); // Obtener el usuario del contexto

  return (
    <Routes>
      {/* Redirige a la página de dashboard si el usuario está autenticado, de lo contrario a la página de login */}
      <Route path="/" element={<App />} />
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
      <Route path="/chatdam/login" element={<Login />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/chatdam/login/method/github" element={<GitHubResponse />} />
      <Route path="/search" element={<SearchUser />} />

      {/* Ruta para manejar páginas no encontradas (404) */}
      <Route path="*" element={<div>Página no encontrada (404)</div>} />
    </Routes>
  );
}

root.render(
  <React.StrictMode>
    <UserProvider> {/* Envuelve tu aplicación con UserProvider */}
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();