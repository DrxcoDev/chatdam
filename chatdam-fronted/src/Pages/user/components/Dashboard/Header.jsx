import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useUser } from '../../userContext.js'; // Importa el hook useUser
import { signOut } from 'firebase/auth'; // Importa la función signOut de Firebase
import { auth } from '../../../../firebase.js'; // Importa la instancia de auth de Firebase
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

import Modal from './Profile.jsx';

function Header(){

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
      setShowModal(!showModal);
    };

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

    return(
        <header className="flex p-5 items-center bg-slate-800 sticky top-0 h-[100px] z-50">
            <h1 className="text-2xl ml-3 font-medium text-white">Chatdam</h1>
            <div className="ms:ml-[50px] md:ml-[50px]">
                <ul className="flex -mt-2">
                    <li className="ms:mx-3 md:mx-5 text-white"><Link to="/">Dashboard</Link></li>

                    <li className='ms:mx-3 md:mx-5 text-white'>
                        {user ? (
                            <div>
                                <button className='ms:mx-3 md:mx-5 text-white' onClick={handleSignOut}>Cerrar sesión</button>
                                <button className='ms:mx-3 md:mx-5 text-white' onClick={toggleModal}>Settings</button>
                                <Modal show={showModal} onClose={toggleModal} title={user.displayName}>
                                    <p>This is the content of the modal.</p>
                                </Modal>
                            </div>
                            
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </li>
                </ul>
            </div>

        </header>
    );
}

export default Header