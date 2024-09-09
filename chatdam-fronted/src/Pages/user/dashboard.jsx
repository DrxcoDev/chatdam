// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useUser } from './userContext.js'; // Importa el hook useUser
import { signOut } from 'firebase/auth'; // Importa la función signOut de Firebase
import { auth } from '../../firebase.js'; // Importa la instancia de auth de Firebase
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import { db } from '../../firebase.js';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import Header from './components/Dashboard/Header.jsx';
import PostForm from './Post/PostForm';
import PostList from './Post/PostList';


function Dashboard() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let postsArray = [];
        querySnapshot.forEach((doc) => {
          postsArray.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postsArray);
      });
  
      return () => unsubscribe();
    }, []);  

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { user, setUser } = useUser(); // Obtén el usuario y la función para actualizar el usuario del contexto
  const navigate = useNavigate(); // Hook para navegar programáticamente
  const [creationDate, setCreationDate] = useState('');

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuario desconectado');
        setUser(null); // Borra la información del usuario del contexto
        navigate('/'); // Redirige a la página de inicio (Home) después de cerrar sesión
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (user) {
      // Obtén la fecha de creación de la cuenta del usuario
      const creationTime = user.metadata.creationTime;
      setCreationDate(new Date(creationTime).toLocaleDateString()); // Convierte la fecha a un formato legible
    }
  }, [user]);


  return (
    <div className='bg-slate-900 text-white'>
        <Header /> {/* Componente Header */}
        <div className="p-20 pl-28">

            {user ? (
                <div className="">
                    <div className='flex gap-2 items-center'>
                        <svg className='text-slate-400' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19v-6.25h7V21zm7 0v-8.25h9V19q0 .825-.587 1.413T19 21zM3 10.75V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v5.75z"/></svg>
                        <p className='text-4xl font-medium text-slate-400'>{user.displayName} Dashboard</p> {/* Muestra el nombre del usuario */}
                    </div>
                    <div className="flex items-center">
                        <img src={user.photoURL} className='rounded-full w-[150px] h-[150px] mt-10' alt="" />
                        
                        <div className="mt-8 pl-8">
                            <ul>
                                <h1 className='text-slate-400 font-medium'>User propieties</h1>
                                <li className='flex text-slate-400 items-center gap-x-3 gap-y-3 w-[400px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                                    {user.displayName}
                                    <div className="justify-end ml-10">
                                        <button className='pt-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="m24 4l-6 6h-8v8l-6 6l6 6v8h8l6 6l6-6h8v-8l6-6l-6-6v-8h-8z"/><path d="M24 30a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"/></g></svg>
                                        </button>
                                    </div>
                                </li>
                                <li className='flex text-slate-400 items-center gap-x-3 gap-y-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 18q-1.05 0-1.775-.725T12 15.5t.725-1.775T14.5 13t1.775.725T17 15.5t-.725 1.775T14.5 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6z"/></svg>
                                    {creationDate}</li>
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
                    
                    <div className="w-[400px]">
                        <PostForm />
                    </div>
                    
                    <PostList />
                </div>
            
        ) : (
            <p>Cargando...</p>
        )}

        </div>
      
    </div>
  );
}

export default Dashboard;
