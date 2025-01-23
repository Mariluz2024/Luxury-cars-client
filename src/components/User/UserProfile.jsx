import React, { useState } from "react";

const UserProfile = ({ user, onUpdate }) => {
    const [nombre, setNombre] = useState(user.nombre);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        onUpdate({ ...user, nombre });
        setIsEditing(false);
    };

    return (
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">User Profile</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    ) : (
                        <p className="text-gray-900">{nombre}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <p className="text-gray-500">{user.correo}</p>
                </div>

                <div className="flex justify-end space-x-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
