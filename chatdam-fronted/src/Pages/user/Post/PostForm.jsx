import React, { useState } from 'react';
import { db } from '../../../firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUser } from '../userContext.js'; // Asegúrate de tener un contexto de usuario configurado
import './textarea.css';

function PostForm() {
  const { user } = useUser();
  const [postContent, setPostContent, label] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    try {
      await addDoc(collection(db, 'posts'), {
        content: postContent,
        createdAt: serverTimestamp(),
        label: label,
        user: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });
      setPostContent('');
    } catch (error) {
      console.error("Error al agregar la publicación: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b">
      <textarea
        className="w-full p-2  rounded bg-slate-500 text-slate-900"
        rows="3"
        placeholder="¿Qué está pasando?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <button type="submit" className="bg-slate-500 text-white px-4 py-2 mt-2 rounded">
        Publicar
      </button>
    </form>
  );
}

export default PostForm;
