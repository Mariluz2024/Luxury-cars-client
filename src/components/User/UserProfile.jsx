import React, { useState } from "react";

const UserProfile = ({}) => {
    const nombre = localStorage.getItem('nombre')
    const correo = localStorage.getItem('correo')
    
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">User Profile</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <p className="text-gray-900">{nombre}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <p className="text-gray-500">{correo}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
