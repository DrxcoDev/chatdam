import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="w-full max-w-md p-4 bg-white rounded shadow-md mt-4">
      <div className="flex items-center mb-4">
        <img
          src={user.photoURL || 'https://via.placeholder.com/150'}
          alt={user.displayName}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">{user.displayName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div>
        {/* Aquí puedes agregar más información sobre el perfil del usuario */}
        <p className="text-gray-700">Biografía: {user.bio || 'No disponible'}</p>
        <p className="text-gray-700">Ubicación: {user.location || 'No disponible'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
