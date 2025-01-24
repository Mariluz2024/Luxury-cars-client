import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import UserFavorite from "./UserFavorite";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserFavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const goToCarDetails = (car) => navigate(`/cars/details`, { state: { car } });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userId')
        const response = await axios.get(`${API_BASE_URL}/favorites/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load favorites.");
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(favorites.filter((car) => car._id !== id));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading favorites...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">My Favorites</h1>
      {favorites.length > 0 ? (
        favorites.map((car) => (
          <UserFavorite
            key={car._id}
            car={car.carId}
            favoriteId={car._id}
            onRemove={handleRemove}
          />
        ))
      ) : (
        <p className="text-gray-600">You have no favorite cars yet.</p>
      )}
    </div>
  );
};

export default UserFavoriteList;
