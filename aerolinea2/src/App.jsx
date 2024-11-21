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
import ProtectedRoute from './components/ProtectedRoute';
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
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Vuelos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asientos"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Asientos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aviones"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Aviones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservas"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Reservas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nosotros"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Nosotros />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
