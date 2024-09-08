// Dashboard.js
import React from 'react';
import { useUser } from './userContext.js'; // Importa el hook useUser
import { signOut } from 'firebase/auth'; // Importa la función signOut de Firebase
import { auth } from '../../firebase.js'; // Importa la instancia de auth de Firebase
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

function Dashboard() {
  const { user, setUser } = useUser(); // Obtén el usuario y la función para actualizar el usuario del contexto
  const navigate = useNavigate(); // Hook para navegar programáticamente

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuario desconectado');
        setUser(null); // Borra la información del usuario del contexto
        navigate('/'); // Redirige a la página de inicio (Home) después de cerrar sesión
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Bienvenido, {user.displayName}</p> {/* Muestra el nombre del usuario */}
          <button onClick={handleSignOut}>Cerrar sesión</button> {/* Botón para cerrar sesión */}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Dashboard;
