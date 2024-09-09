import './styles/login.css';
import { auth, githubProvider, db } from '../../firebase';
import React, { useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './userContext.js'; // Importa el hook useUser
import { setDoc, doc } from 'firebase/firestore';

function Login() {
  const { user, setUser } = useUser(); // Obtén el usuario y la función para establecer el usuario del contexto
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Guarda la información del usuario en el contexto
        navigate('/dashboard'); // Redirige a la página de Dashboard después del login
      }
    });

    return () => unsubscribe();
  }, [setUser, navigate]);

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      // Guardar datos del usuario en Firestore
      const userRef = doc(db, 'users', user.uid);  // Crear una referencia a la colección 'users' con el uid del usuario
      await setDoc(userRef, {
        displayName: user.displayName || user.email.split('@')[0],  // Puedes usar el nombre del usuario o parte del correo
        email: user.email,
        photoURL: user.photoURL || 'https://via.placeholder.com/150',  // Foto de perfil o una imagen por defecto
        // Otros campos opcionales
        bio: '',
        location: ''
      }, { merge: true });  // Usa merge para actualizar el documento si ya existe

      setUser(user); // Guarda la información del usuario en el contexto
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión con GitHub: ', error);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuario desconectado');
        setUser(null); // Borra la información del usuario del contexto
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex sm:w-full">
      <div className="login-container">
        <h1>Login</h1>
        <form>
          <label>
            Nombre de usuario:
            <input type="text" />
          </label>
          <br />
          <label>
            Contraseña:
            <input type="password" />
          </label>
          <br />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
      <div className="w-1 h-[50vh] bg-[#e55d87] rounded-lg md:ml-[200px] mr-[200px] mt-44 sm:ml-0"></div>
      <div className="my-72">
        <Link to="/chatdam/login/method/github" id="github-login" className="flex items-center border-2 border-pink-300 rounded-md p-2 hover:bg-pink-100">
          <svg className="text-pink-300" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
          </svg>

          {user ? (
            <div>
              <p>Bienvenido, {user.displayName}</p>
              <button onClick={handleSignOut}>Cerrar sesión</button>
            </div>
          ) : (
            <button onClick={signInWithGithub} className='className="ml-5"'>Iniciar sesión con GitHub</button>
          )}
        </Link>
        <div className="App">
        </div>
      </div>
    </div>
  );
}

export default Login;