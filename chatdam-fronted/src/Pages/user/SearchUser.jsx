import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Asegúrate de importar tu configuración de Firebase
import { collection, getDocs, query, where, startAt, endAt } from 'firebase/firestore';

function SearchUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.trim() === '') {
        setUsers([]); // Limpiar la lista si no hay término de búsqueda
        return;
      }

      const q = query(
        collection(db, 'users'),
        where('displayName', '>=', searchTerm),
        where('displayName', '<=', searchTerm + '\uf8ff') // Esto asegura que se busque en el rango de términos que empiezan con el término de búsqueda
      );

      try {
        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error al buscar usuarios: ', error);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.photoURL || 'https://via.placeholder.com/150'} alt={user.displayName} className="user-photo" />
              <p>{user.displayName}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron usuarios</p>
        )}
      </div>
    </div>
  );
}

export default SearchUser;
