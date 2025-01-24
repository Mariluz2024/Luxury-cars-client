import React from "react";
import { Link } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const Navbar = () => {
  const loggedIn = isAuthenticated();

  return (
    <nav className="bg-blue-600 text-white fixed top-0 w-full shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-lg font-bold">
          <Link to="/">Luxury Cars</Link>
        </div>

        <ul className="flex space-x-6">
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
