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
import CrearReserva from './pages/CrearReserva';
import CrearAvion from './pages/CrearAvion';
import EliminarAvion from './pages/EliminarAvion';
import Usuarios from './pages/Usuarios';

function App() {
  // Estado para manejar autenticación 
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

    const handleLogout = () => {
        sessionStorage.clear(); // Eliminar el token y otros datos de sesión
        setIsAuthenticated(false);
  };

  return (
    <Router>
       <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
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
          path="/aviones/crear"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CrearAvion />
            </PrivateRoute>
          }
        />
         <Route
          path="/aviones/eliminar/:idAvion"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <EliminarAvion />
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
          path="/reservas/crear"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CrearReserva />
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
        {/* Ruta para ver los usuarios, solo accesible para los admin (id_rol: 2) */}
        <Route
          path="/usuarios"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Usuarios /> {/* Este componente ya verifica el rol dentro de él */}
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;