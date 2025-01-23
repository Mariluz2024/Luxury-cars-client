import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white fixed top-0 w-full shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link to="/">MiSitio</Link>
        </div>

        {/* Menu */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/login"
              className="hover:text-gray-200 transition duration-300"
            >
              Iniciar Sesión
            </Link>
          </li>
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
            <Link
              to="/signup"
              className="hover:text-gray-200 transition duration-300"
            >
              Registrarse
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
