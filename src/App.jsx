import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CarList from "./components/CarList";
import UserProfile from "./components/User/UserProfile";
import UserFavoriteList from "./components/User/UserFavoriteList";
import ComparisonList from "./components/Comparison/ComparisonList";
import ComparisonDetails from "./components/Comparison/ComparisonDetails";
import CarDetailsPage from "./components/Car/CarDetailsPage";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {

  const handleUpdate = (updatedUser) => {
    console.log("Updated user:", updatedUser);
  };

  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Public Routes */}
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated() ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/cars" element={<CarList />} />
          <Route path="/cars/details" element={<CarDetailsPage />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile onUpdate={handleUpdate} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <UserFavoriteList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/comparisons"
            element={
              <ProtectedRoute>
                <ComparisonList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/comparisons/details/:id"
            element={
              <ProtectedRoute>
                <ComparisonDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
