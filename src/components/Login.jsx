import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      setMessage(response.data.message);

      localStorage.setItem("userId", response.data.user.id)
      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al iniciar sesión. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
