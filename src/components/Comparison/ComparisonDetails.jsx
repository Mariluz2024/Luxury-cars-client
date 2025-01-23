import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ComparisonDetails = () => {
  const id = useLocation().pathname.split("/").pop();
  const [comparison, setComparison] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const goToCarDetails = (car) => navigate(`/cars/details`, { state: { car } });

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/comparisons/${id}`);
        setComparison(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load comparison details.");
        setLoading(false);
      }
    };

    fetchComparison();
  }, [id]);

  const onSelect = async (comparisonId, carIdSelected) => {
    try {
      await axios.put(`${API_BASE_URL}/comparisons/${comparisonId}/select`, {
        carIdSelected,
      });
      setComparison((prevComparison) => ({
        ...prevComparison,
        selected: carIdSelected,
      }));
    } catch (err) {
      console.error("Failed to select car:", err);
    }
  };

  const onDelete = async (comparisonId, carIdToRemove) => {
    try {
      const config = {
        method: "delete",
        url: `${API_BASE_URL}/comparisons/${comparisonId}/delete-car`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          carIdToRemove,
        },
      };

      await axios(config);

      setComparison((prevComparison) => ({
        ...prevComparison,
        carIds: prevComparison.carIds.filter(
          (carId) => carId._id !== carIdToRemove
        ),
      }));
    } catch (err) {
      console.error("Failed to remove car:", err);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-600">Loading comparison details...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        {comparison.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comparison.carIds.map((car) => (
          <div
            key={car._id}
            className={`bg-white border-8 ${
              comparison.selected == car._id
                ? "border-green-500"
                : "border-gray-200"
            } rounded-lg shadow-md p-4 flex flex-col items-center`}
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-bold text-blue-800" onClick={() => goToCarDetails(car)}>{car.name}</h2>
            <p className="text-gray-600">
              Price: ${car.price.toLocaleString()}
            </p>
            <p className="text-gray-600">HP: {car.hp}</p>
            <p className="text-gray-600">Model: {car.model}</p>
            <p className="text-gray-600">Stock: {car.stock}</p>
            {comparison.selected !== car._id && (
              <button
                onClick={() => onSelect(comparison._id, car._id)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Select
              </button>
            )}
            <button
              onClick={() => onDelete(comparison._id, car._id)}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonDetails;
