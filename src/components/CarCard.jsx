import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comparisonLists, setComparisonLists] = useState([]);
  const [selectedComparison, setSelectedComparison] = useState(null);

  const fetchComparisonLists = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/comparisons/user/${userId}`
      );
      setComparisonLists(response.data);
    } catch (error) {
      console.error("Error fetching comparison lists:", error);
      alert("Failed to load comparison lists.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    fetchComparisonLists();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComparison(null);
  };

  const addToComparison = async () => {
    if (!selectedComparison) {
      alert("Please select a comparison list.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/comparisons/${selectedComparison}/add-car`,
        { carId: car._id }
      );
      alert("Car added to the comparison list successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding car to comparison list:", error);
      alert("Failed to add car to the comparison list.");
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/favorites/user/${userId}`
        );

        const favoriteCars = response.data.map((fav) => fav.carId._id);
        
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
        {isAuthenticated() && (
          <div>
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
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition"
              onClick={openModal}
            >
              Add to comparison list...
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
            <h2 className="text-lg font-bold mb-4 text-center">
              Select a Comparison List
            </h2>
            <ul className="space-y-2">
              {comparisonLists.map((list) => (
                <li key={list._id}>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="comparison"
                      value={list._id}
                      onChange={() => setSelectedComparison(list._id)}
                      className="form-radio text-blue-600"
                    />
                    <span>{list.name}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={addToComparison}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarCard;
