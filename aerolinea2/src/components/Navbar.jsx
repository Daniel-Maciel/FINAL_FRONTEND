// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

export default function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <nav className="navbar">
      <img src="src/assets/tur.png" alt="Logo" className="navbar-logo" />
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/asientos">Asientos</Link></li>
            <li><Link to="/aviones">Aviones</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/usuarios">Usuarios</Link></li>
            <li><Link to="/vuelos">Vuelos</Link></li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="login-button">Iniciar Sesión</Link></li>
            {/* <li><Link to="/register">Registrarse</Link></li> */}
          </>
        )}
      </ul>
    </nav>
  );
}