// src/pages/Home.jsx
import React, { useState } from 'react';
import '../style/Home.css';
import Destinos from '../components/Destinos';
import Footer from '../components/Footer';

export default function Home() {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [vuelos, setVuelos] = useState([]);
  const [error, setError] = useState('');

  const buscarVuelos = async () => {
    // Validar si los campos están vacíos
  if (!origen || !destino || !fechaSalida) {
    setError('Por favor, completa todos los campos antes de buscar.');
    setVuelos([]); // Limpiar la lista de vuelos
    return;
  }
    const url = `http://localhost:8081/vuelo?origen=${origen}&destino=${destino}&fechaSalida=${fechaSalida}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al buscar vuelos');
      }

      const data = await response.json();

    if (data.length === 0) {
      setError(`No hay vuelos disponibles para el origen "${origen}", destino "${destino}" y fecha "${fechaSalida}".`);
    } else {
      setVuelos(data);
      setError('');
    }
  } catch (err) {
    setError(err.message);
    setVuelos([]);
  }
  };

  return (
    <div className="home">
      <h1> Airlines</h1>
      <div className="buscador-vuelos">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="origen">Origen:</label>
            <input
              id="origen"
              type="text"
              placeholder="Ingresa desde dónde..."
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="destino">Destino:</label>
            <input
              id="destino"
              type="text"
              placeholder="Ingresa hacia dónde..."
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaSalida">Fecha de salida:</label>
            <input
              id="fechaSalida"
              type="date"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
            />
          </div>
        </div>
        {/* <button onClick={buscarVuelos}>Buscar vuelos</button> */}
        <button onClick={() => { console.log('Buscando vuelos...'); buscarVuelos(); }}>Buscar vuelos</button>

      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <div className="lista-vuelos">
     {vuelos.length > 0 ? (
     vuelos.map((vuelo) => (
      <div key={vuelo.id_vuelo} className="vuelo">
        <h3>Vuelo {vuelo.numero_vuelo}</h3>
        <p>Origen: {vuelo.origen}</p>
        <p>Destino: {vuelo.destino}</p>
        <p>Fecha de salida: {new Date(vuelo.fecha_salida).toLocaleString()}</p> {/* Formato de fecha */}
        <p>Fecha de llegada: {new Date(vuelo.fecha_llegada).toLocaleString()}</p> {/* Formato de fecha */}
      </div>
    ))
      ) :
       (
     <p> </p>
     )
  }
</div>

      <Destinos />
      <Footer /> 
    </div>
    
  );
}
