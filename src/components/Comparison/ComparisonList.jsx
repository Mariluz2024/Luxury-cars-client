import React, { useEffect, useState } from "react";

import axios from "axios";

import ComparisonCard from "./ComparisonCard";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ComparisonList = () => {
    const [comparisons, setComparisons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComparisons = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/comparisons`);
                setComparisons(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load comparisons.");
                setLoading(false);
            }
        };

        fetchComparisons();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/comparisons/${id}`);
            setComparisons(comparisons.filter((comparison) => comparison._id !== id));
        } catch (err) {
            console.error("Failed to delete comparison:", err);
        }
    };

    if (loading) {
        return <p className="text-center text-gray-600">Loading comparisons...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Comparisons</h1>
            {comparisons.length > 0 ? (
                comparisons.map((comparison) => (
                    <ComparisonCard
                        key={comparison._id}
                        comparison={comparison}
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <p className="text-gray-600">No comparisons available.</p>
            )}
        </div>
    );
};

export default ComparisonList;
