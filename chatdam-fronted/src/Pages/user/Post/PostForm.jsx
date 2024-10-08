import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebase';  // Asegúrate de importar auth para obtener el usuario actual
import { collection, addDoc, serverTimestamp, query, where, onSnapshot } from 'firebase/firestore';
import { useUser } from '../userContext.js'; // Asegúrate de tener un contexto de usuario configurado
import './textarea.css';

function PostForm() {
  const [content, setContent] = useState('');
  const [isCreator, setIsCreator] = useState(false);  // Estado para verificar si es creador
  const user = auth.currentUser;  // Obtener el usuario actual

  useEffect(() => {
    if (!user) return;

    // Consulta para verificar si el usuario actual es el creador
    const q = query(
      collection(db, 'posts'),
      where('createdBy', '==', user.uid)  // Filtrar por el ID del usuario actual
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        setIsCreator(true);  // Si el usuario tiene al menos un post, es un creador
      } else {
        setIsCreator(false);  // Si no tiene ningún post, no es un creador
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === '' || !user) return;  // Verificar si el usuario está autenticado

    try {
      await addDoc(collection(db, 'posts'), {
        content,
        createdAt: serverTimestamp(),
        createdBy: user.uid,  // Guardar la ID del usuario creador
        creatorName: user.displayName,  // Guardar el nombre del creador
        creatorPhotoURL: user.photoURL,  // Guardar la URL de la foto de perfil del creador
      });
      setContent('');
    } catch (error) {
      console.error('Error al agregar la publicación: ', error);
    }
  };

  // Mostrar el formulario solo si el usuario es el creador
  if (!isCreator) {
    return null;  // Si no es el creador, no muestra nada
  }


  return (
    <form onSubmit={handleSubmit} className="p-4 border-b">
      <textarea
        className="w-full p-2  rounded bg-slate-500 text-slate-900"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu publicación..."
      />
      <button type="submit" className="bg-slate-500 text-white px-4 py-2 mt-2 rounded">
        Publicar
      </button>
    </form>
  );
}

export default PostForm;
