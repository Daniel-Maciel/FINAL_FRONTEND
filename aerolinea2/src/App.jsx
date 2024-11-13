// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vuelos from './pages/Vuelos';
import Asientos from './pages/Asientos';
import Aviones from './pages/Aviones';
import Nosotros from './pages/Nosotros';
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

              <Route path="/nosotros" element={<Nosotros />} />
              
              </Routes>
      </Router>
  );
}
export default App;