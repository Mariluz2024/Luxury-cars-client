import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const userId = "67898ae0d4c5bde01c0dc9dd";

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/favorites/user/${userId}`
        );

        const favoriteCars = response.data.map((fav) => fav.carId);
        setIsFavorite(favoriteCars.includes(car._id));
      } catch (error) {
        console.error("Error fetching favorite cars:", error);
      }
    };

    fetchFavorites();
  }, [car._id]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`${API_BASE_URL}/favorites`, {
          data: { carId: car._id, userId },
        });
        setIsFavorite(false);
      } else {
        await axios.post(`${API_BASE_URL}/favorites`, {
          carId: car._id,
          userId,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
      alert("An error occurred while updating favorite status.");
    }
  };

  const goToCarDetails = (car) => navigate(`/cars/details`, { state: { car } });

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2
          className="text-lg font-bold text-blue-900 cursor-pointer"
          onClick={() => goToCarDetails(car)}
        >
          {car.name}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{car.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-green-600">
            ${car.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">Model: {car.model}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">HP: {car.hp}</span>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              car.stock > 0
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {car.stock > 0 ? `In Stock: ${car.stock}` : "Out of Stock"}
          </span>
        </div>
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          onClick={() => goToCarDetails(car)}
        >
          View Details
        </button>
        <button
          className={`mt-4 w-full ${
            isFavorite
              ? "bg-red-600 hover:bg-red-700"
              : "bg-yellow-400 hover:bg-yellow-500"
          } text-white py-2 px-4 rounded-lg transition`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Remove from favorites" : "Mark as favorite"}
        </button>
        <button
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          onClick={() => goToCarDetails(car)}
        >
          Add to comparison list
        </button>
      </div>
    </div>
  );
};

export default CarCard;
