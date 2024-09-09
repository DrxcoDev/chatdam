import React, { useState } from 'react';
import { db, auth } from '../../../firebase';  // Asegúrate de importar auth para obtener el usuario actual
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUser } from '../userContext.js'; // Asegúrate de tener un contexto de usuario configurado
import './textarea.css';

function PostForm() {
  const [content, setContent] = useState('');
  const user = auth.currentUser;  // Obtener el usuario actual

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
