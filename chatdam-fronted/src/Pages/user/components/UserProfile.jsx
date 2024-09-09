import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase'; // Asegúrate de importar tu configuración de Firebase
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom'; // Para obtener el ID del usuario de la URL
import Header from './Dashboard/Header'
import PostList from '../Post/PostList'


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
            <div className="bg-slate-900">
                <Header />
                <div className="p-20 pl-28">
                    <div className="flex items-center">
                    <img src={user.photoURL} className='rounded-full w-[150px] h-[150px] mt-10' alt="" />

                    <div className="mt-8 pl-8">
                        <ul>
                            <h1 className='text-slate-400 font-medium'>User propieties</h1>
                            <li className='flex text-slate-400 items-center gap-x-3 gap-y-3 w-[400px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                                {user.displayName}
                            </li>
                        </ul>
                    </div>

                    <div className="sticky top-0">
                        <div className="">
                            <img className='rounded-2xl' src="https://i.pinimg.com/736x/8b/c1/07/8bc107b985b5876d988b4a0b0de5bdac.jpg" alt="" />
                        </div>
                        <div className="mt-20">
                            <h1 className='text-slate-400'>Description</h1>
                            <p className='text-slate-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus repellat explicabo corporis animi vitae esse quidem assumenda earum quaerat temporibus?</p>
                        </div>
                    </div>
                </div>
                <div className="pt-[50px]">
                    <PostList />
                </div>
                
                </div>
            </div>
            


      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
}

export default UserProfile;
