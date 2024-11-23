// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vuelos from './pages/Vuelos';
import Asientos from './pages/Asientos';
import Aviones from './pages/Aviones';
import Nosotros from './pages/Nosotros';
import Login from './pages/Login';
import Reservas from './pages/Reservas';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';

function App() {
  // Estado para manejar autenticación (ejemplo: falso por defecto)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar /> 
      <Routes>
        {/* Ruta abierta */}
        <Route path="/" element={<Home />} />

        {/* Ruta de login */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/vuelos"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Vuelos />
            </PrivateRoute>
          }
        />
        <Route
          path="/asientos"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Asientos />
            </PrivateRoute>
          }
        />
        <Route
          path="/aviones"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Aviones />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservas"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Reservas />
            </PrivateRoute>
          }
        />
        <Route
          path="/nosotros"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Nosotros />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;