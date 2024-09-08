// Dashboard.js
import React from 'react';
import { useUser } from './userContext.js'; // Importa el hook useUser

function Dashboard() {
  const { user } = useUser(); // Obtén el usuario del contexto

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>Bienvenido, {user.displayName}</p> // Muestra el nombre del usuario
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Dashboard;