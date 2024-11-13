// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>

            <li><Link to="/vuelos">Vuelos</Link></li>

            <li><Link to="/asientos">Asientos</Link></li>

            <li><Link to="/aviones">Aviones</Link></li>

            <li><Link to="/nosotros">Nosotros</Link></li>
            
      </ul>
    </nav>
  );
};

export default Navbar;
