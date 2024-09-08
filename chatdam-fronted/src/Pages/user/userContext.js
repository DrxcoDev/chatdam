// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const UserContext = createContext();

// Proveedor de contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = () => useContext(UserContext);
