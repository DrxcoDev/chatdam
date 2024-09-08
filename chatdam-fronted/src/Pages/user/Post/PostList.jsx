import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase.js';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function PostList() {
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

  return (
    <div className="p-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 mb-4 rounded shadow-sm">
          <div className="flex items-center mb-2">
            {post.user.photoURL && (
              <img src={post.user.photoURL} alt="User" className="w-10 h-10 rounded-full mr-2" />
            )}
            <h4 className="font-semibold">{post.user.displayName}</h4>
          </div>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
