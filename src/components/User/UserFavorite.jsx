import React from "react";
import { useNavigate } from "react-router-dom";

const FavoriteCarCard = ({ car, favoriteId, onRemove }) => {
    const navigate = useNavigate();
    const goToCarDetails = (car) => navigate(`/cars/details`, { state: { car } });

    return (
        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4">
            {/* Car Image */}
            <img
                src={car.image}
                alt={car.name}
                className="w-24 h-24 object-cover rounded-lg"
            />

            {/* Car Details */}
            <div className="ml-4 flex-1">
                <h2 className="text-lg font-bold text-blue-900" onClick={() => goToCarDetails(car)}>{car.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                    ${car.price.toLocaleString()}
                </p>
            </div>

            {/* Remove Button */}
            <button
                onClick={() => onRemove(favoriteId)}
                className="ml-auto bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            >
                Remove
            </button>
        </div>
    );
};

export default FavoriteCarCard;
