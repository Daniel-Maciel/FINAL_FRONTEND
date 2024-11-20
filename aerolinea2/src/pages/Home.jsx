// src/pages/Home.jsx
import React, { useState } from 'react';
import '../style/Home.css';

export default function Home() {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [vuelo, setVuelos] = useState([]);
  const [error, setError] = useState('');

  const buscarVuelos = async () => {
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
      setVuelos(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setVuelos([]);
    }
  };

  return (
    <div className="home">
      <h1>Busca tu vuelo</h1>
      <div className="buscador-vuelos">
        <label>
          Origen:
          <input
            type="text"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
          />
        </label>
        <label>
          Destino:
          <input
            type="text"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
          />
        </label>
        <label>
          Fecha de salida:
          <input
            type="date"
            value={fechaSalida}
            onChange={(e) => setFechaSalida(e.target.value)}
          />
        </label>
        <button onClick={buscarVuelos}>Buscar vuelos</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="lista-vuelos">
        {vuelo.length > 0 ? (
          vuelo.map((vuelo) => (
            <div key={vuelo.id} className="vuelo">
              <h3>Vuelo {vuelo.numeroVuelo}</h3>
              <p>Origen: {vuelo.origen}</p>
              <p>Destino: {vuelo.destino}</p>
              <p>Fecha de salida: {vuelo.fechaSalida}</p>
              <p>Precio: ${vuelo.precio}</p>
            </div>
          ))
        ) : (
          <p>No hay vuelos disponibles.</p>
        )}
      </div>
    </div>
  );
}
