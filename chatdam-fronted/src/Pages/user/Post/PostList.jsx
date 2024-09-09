import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../firebase';  // Importar auth para obtener el usuario actual
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const user = auth.currentUser;  // Obtener el usuario actual

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
      } catch (error) {
        console.error('Error al eliminar la publicación: ', error);
      }
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-slate-500 mb-4 shadow-md rounded">
          <button className='bg-slate-500 hover:bg-slate-700 m-5 rounded-lg'>
            <div className="flex p-2">
              {post.creatorPhotoURL && (  // Mostrar la foto de perfil del creador si está disponible
                <img src={post.creatorPhotoURL} className='rounded-full w-[25px] h-[25px]' alt="" />
                
              )}

              <h2 className='ml-2'>{post.creatorName}</h2>
            </div>
          </button>
          
          <div className="pl-10">
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">Publicado por: {post.creatorName || 'Anónimo'}</p>
            {user && user.uid === post.createdBy && (  // Verificar si el usuario autenticado es el creador
              <button
                onClick={() => handleDelete(post.id)}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mb-4"
              >
                Eliminar
              </button>
            )}
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default PostList;
