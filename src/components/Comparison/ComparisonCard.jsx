import React from 'react';
import { Link } from 'react-router-dom';

const ComparisonCard = ({ comparison, onDelete }) => {
    return (
        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4">
            <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">
                    <Link to={{ pathname: `/comparisons/details/${comparison._id}`}}>
                        {comparison.name}
                    </Link>
                </h2>
                <p className="text-sm text-gray-600">
                    {comparison.carIds.length} cars in comparison
                </p>
            </div>

            <button
                onClick={() => onDelete(comparison._id)}
                className="ml-auto bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            >
                Delete
            </button>
        </div>
    );
};

export default ComparisonCard;
