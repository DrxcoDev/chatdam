import { Link } from 'react-router-dom';
import React from 'react';
import { useUser } from '../../userContext.js'; // Importa el hook useUser
import { signOut } from 'firebase/auth'; // Importa la función signOut de Firebase
import { auth } from '../../../../firebase.js'; // Importa la instancia de auth de Firebase
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

function Header(){

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
                    <li className="ms:mx-3 md:mx-5 text-white"><a href="">Profile</a></li>
                    <li className='ms:mx-3 md:mx-5 text-white'>
                        {user ? (
                            <button onClick={handleSignOut}>Cerrar sesión</button>
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