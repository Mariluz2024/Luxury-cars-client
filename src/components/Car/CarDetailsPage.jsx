import React, { useState } from 'react';

const CarDetailsPage = ({ car }) => {
  if (!car) return <div className="p-4">Loading...</div>;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isInComparison, setIsInComparison] = useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleComparison = () => setIsInComparison(!isInComparison);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{car.name}</h2>
          <div className="flex">
            <img src={car.image} alt={car.name} className="w-1/2 h-64 object-cover rounded-lg mr-4" />
            <div>
              <p className="text-gray-600 mb-1">Price: ${car.price.toLocaleString()}</p>
              <p className="text-gray-600 mb-1">HP: {car.hp}</p>
              <p className="text-gray-600 mb-1">Model: {car.model}</p>
              <p className="text-gray-600 mb-1">Stock: {car.stock}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button
            className={`px-4 py-2 rounded-md ${isFavorite ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <button
            className={`px-4 py-2 rounded-md ${isInComparison ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={toggleComparison}
            style={{ marginLeft: '0.5rem' }}
          >
            {isInComparison ? 'Remove from Comparison' : 'Add to Comparison'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
