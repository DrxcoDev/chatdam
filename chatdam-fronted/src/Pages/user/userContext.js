// UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

// Crear contexto del usuario
const UserContext = createContext();

// Crear un hook para acceder fácilmente al contexto
export const useUser = () => useContext(UserContext);

// Proveedor de contexto del usuario
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Estado del usuario
  const [loading, setLoading] = useState(true);  // Estado de carga

  // Efecto para verificar si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Actualizar el usuario autenticado
      setLoading(false);  // Deja de cargar después de obtener el usuario
    });

    return () => unsubscribe();
  }, []);

  // Muestra "Cargando..." solo si está verificando la autenticación
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Proveedor del contexto que incluye el usuario y la función setUser
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
