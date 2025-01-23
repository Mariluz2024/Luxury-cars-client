import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const goToCarDetails = (car) => navigate(`/cars/details`, { state: { car } });

  const markAsFavorite = async (carId) => {
    try {
      // Replace this with the actual user ID in your application
      const userId = "67898ae0d4c5bde01c0dc9dd";

      const response = await axios.post(`${API_BASE_URL}/favorites`, {
        carId,
        userId,
      });

      if (response.status === 201) {
        alert("Car marked as favorite successfully!");
      } else {
        alert("Failed to mark car as favorite.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("This car is already marked as favorite.");
      } else {
        console.error("Error marking as favorite:", error);
        alert("An error occurred while marking as favorite.");
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2
          className="text-lg font-bold text-blue-900"
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
          className="mt-4 w-full bg-yellow-400 text-grey py-2 px-4 rounded-lg hover:bg-yellow-250 transition"
          onClick={() => markAsFavorite(car._id)}
        >
          Mark as favorite
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
