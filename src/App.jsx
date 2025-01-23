import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CarList from "./components/CarList";
import UserProfile from "./components/User/UserProfile";
import UserFavoriteList from "./components/User/UserFavoriteList";
import ComparisonList from "./components/Comparison/ComparisonList";
import ComparisonDetails from "./components/Comparison/ComparisonDetails";

const App = () => {
  const user = {
    nombre: "John Doe",
    correo: "johndoe@example.com",
  };

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars" element={<CarList />} />
          <Route
            path="/profile"
            element={<UserProfile user={user} onUpdate={handleUpdate} />}
          />
          <Route
            path="/favorites"
            element={<UserFavoriteList />}
          />
          <Route
            path="/comparisons"
            element={<ComparisonList />}
          />
          <Route
            path="/comparisons/details/:id"
            element={<ComparisonDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;