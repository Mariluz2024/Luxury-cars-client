import React from "react";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
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
      </div>
    </div>
  );
};

export default CarCard;
