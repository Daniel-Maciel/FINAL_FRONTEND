// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vuelos from './pages/Vuelos';
import Asientos from './pages/Asientos';
import Aviones from './pages/Aviones';
import Nosotros from './pages/Nosotros';
import Login from './pages/Login';
import Reservas from './pages/Reservas';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <Navbar />
             <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/vuelos" element={<Vuelos />} />

              <Route path="/asientos" element={<Asientos />} />

              <Route path="/aviones" element={<Aviones />} />

              <Route path="/reservas" element={<Reservas />} />

              <Route path="/nosotros" element={<Nosotros />} />

              <Route path="/login" element={<Login />} />
              
              </Routes>
      </Router>
  );
}
export default App;
