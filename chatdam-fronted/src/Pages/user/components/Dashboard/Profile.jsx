import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useUser } from '../../userContext.js'; // Importa el hook useUser
import { signOut } from 'firebase/auth'; // Importa la función signOut de Firebase
import { auth } from '../../../../firebase.js'; // Importa la instancia de auth de Firebase
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-slate-700 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center p-4 border-b border-slate-500">
          <h2 className="text-xl font-semibold">{title} Settings</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button 
            onClick={onClose} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
