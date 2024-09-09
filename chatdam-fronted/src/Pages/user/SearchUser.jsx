import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Asegúrate de importar tu configuración de Firebase
import { collection, getDocs, query, where } from 'firebase/firestore';

function SearchUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, 'users'), where('displayName', '>=', searchTerm));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(doc => doc.data());
      setUsers(usersData);
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
          users.map((user, index) => (
            <div key={index} className="user-card">
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
