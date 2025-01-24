import React from "react";
import { Link } from "react-router-dom";

// Mock function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null; // Replace with your actual authentication logic
};

const Navbar = () => {
  const loggedIn = isAuthenticated();

  return (
    <nav className="bg-blue-600 text-white fixed top-0 w-full shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link to="/">MiSitio</Link>
        </div>

        {/* Menu */}
        <ul className="flex space-x-6">
          {/* Show Sign-in and Sign-up only if not logged in */}
          {!loggedIn && (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-gray-200 transition duration-300"
                >
                  Sign-in
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-gray-200 transition duration-300"
                >
                  Sign-up
                </Link>
              </li>
            </>
          )}

          {/* Show authenticated links only if logged in */}
          {loggedIn && (
            <>
              <li>
                <Link
                  to="/favorites"
                  className="hover:text-gray-200 transition duration-300"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/comparisons"
                  className="hover:text-gray-200 transition duration-300"
                >
                  Comparisons
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-gray-200 transition duration-300"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="hover:text-gray-200 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
