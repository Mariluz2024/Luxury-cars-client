import React, { useEffect, useState } from "react";
import axios from "axios";
import ComparisonCard from "./ComparisonCard";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ComparisonList = () => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newComparisonName, setNewComparisonName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchComparisons = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/comparisons/user/${userId}`
        );
        setComparisons(response.data);
        setLoading(false);
      } catch (err) {
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

  const handleCreateComparison = async () => {
    if (!newComparisonName.trim()) {
      alert("Please enter a name for the comparison list.");
      return;
    }

    setCreating(true);

    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(`${API_BASE_URL}/comparisons`, {
        name: newComparisonName,
        userId,
      });

      setComparisons((prevComparisons) => [response.data, ...prevComparisons]);
      setShowModal(false);
      setNewComparisonName("");
    } catch (err) {
      console.error("Failed to create comparison:", err);
      alert("An error occurred while creating the comparison list.");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading comparisons...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Comparisons</h1>
      <button
        className="mb-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        onClick={() => setShowModal(true)}
      >
        Create New Comparison
      </button>
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Create Comparison</h2>
            <input
              type="text"
              value={newComparisonName}
              onChange={(e) => setNewComparisonName(e.target.value)}
              placeholder="Enter comparison name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-500 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${
                  creating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleCreateComparison}
                disabled={creating}
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonList;
