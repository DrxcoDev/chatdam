// UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Estado del usuario
  const [loading, setLoading] = useState(true);  // Estado de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);  // Deja de cargar después de obtener el usuario
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;  // Mostrar "cargando" solo mientras se verifica la autenticación
  }

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
