// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-item">Home</Link>
      
      <Link to="/vuelos" className="navbar-item">Vuelos</Link>

      <Link to="/asientos" className="navbar-item">Asientos</Link>

      <Link to="/aviones" className="navbar-item">Aviones</Link>

      <Link to="/reservas" className="navbar-item">Reservas</Link>

      <Link to="/nosotros" className="navbar-item">Nosotros</Link>

      <Link to="/login" className="navbar-item">Login</Link>

    </nav>
  );
};

export default Navbar;

