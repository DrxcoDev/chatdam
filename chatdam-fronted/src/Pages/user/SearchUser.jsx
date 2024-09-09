import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Asegúrate de importar tu configuración de Firebase
import { collection, getDocs, query, where, startAt, endAt } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección


import Header from './components/Dashboard/Header'

function SearchUser() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUsers = async () => {
        if (searchTerm.trim() === '') {
          setUsers([]); // Limpiar la lista si no hay término de búsqueda
          return;
        }
  
        const q = query(
          collection(db, 'users'),
          where('displayName', '>=', searchTerm),
          where('displayName', '<=', searchTerm + '\uf8ff')
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
  
    const handleUserClick = (userId) => {
      navigate(`/profile/${userId}`); // Redirige al perfil del usuario
    };

  return (
    <div className='bg-slate-900 text-slate-400'>
        <Header />
        <div className="p-10 pl-10">
            <h1>Buscar usuarios</h1>
            <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-38'
            />
            <div>
                {users.length > 0 ? (
                users.map((user) => (
                    <div key={user.id} className="user-card flex items-center p-5 border-b border-white">
                        <img onClick={() => handleUserClick(user.id)} src={user.photoURL || 'https://via.placeholder.com/150'} alt={user.displayName} className="w-[40px] h-[40px] rounded-full duration-200 hover:rounded-xl hover:duration-200" />
                        <p  onClick={() => handleUserClick(user.id)}  className='text-white mx-5'>{user.displayName}</p>
                    </div>
                ))
                ) : (
                <p>No se encontraron usuarios</p>
                )}
            </div>
        </div>
      
    </div>
  );
}

export default SearchUser;
