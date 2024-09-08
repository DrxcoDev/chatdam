// Dashboard.js
import React from 'react';
import { useUser } from './userContext.js'; // Importa el hook useUser
import { signOut } from 'firebase/auth'; // Importa la función signOut de Firebase
import { auth } from '../../firebase.js'; // Importa la instancia de auth de Firebase
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

import Header from './components/Dashboard/Header.jsx'

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
    <div className='bg-slate-900 text-white'>
        <Header /> {/* Componente Header */}
        <div className="p-14">

            {user ? (
                <div className="">
                    <div className='flex gap-2 items-center'>
                        <svg className='text-slate-400' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19v-6.25h7V21zm7 0v-8.25h9V19q0 .825-.587 1.413T19 21zM3 10.75V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v5.75z"/></svg>
                        <p className='text-4xl font-medium text-slate-400'>{user.displayName} Dashboard</p> {/* Muestra el nombre del usuario */}
                    </div>
                </div>
            
        ) : (
            <p>Cargando...</p>
        )}

        </div>
      
    </div>
  );
}

export default Dashboard;
