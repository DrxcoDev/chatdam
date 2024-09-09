import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase'; // Asegúrate de importar tu configuración de Firebase
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom'; // Para obtener el ID del usuario de la URL

function UserProfile() {
  const { userId } = useParams(); // Obtiene el ID del usuario de la URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        setUser(userSnapshot.data());
      } else {
        console.error('No se encontró el usuario');
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="user-profile">
      {user ? (
        <div>
          <img src={user.photoURL || 'https://via.placeholder.com/150'} alt={user.displayName} className="user-photo" />
          <h1>{user.displayName}</h1>
          <p>{user.bio || 'Sin biografía'}</p>
          <p>{user.location || 'Ubicación desconocida'}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
}

export default UserProfile;
