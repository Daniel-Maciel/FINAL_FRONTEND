import React from 'react';
import '../style/Destinos.css';

const Destinos = () => {
  const destinos = [
    {
      id: 1,
      imagen: '/src/assets/Mendoza.jpg',
      titulo: 'Vuelos a Mendoza',
      descripcion: 'Saliendo desde Buenos Aires',
      precio: '$181.455',
      puntos: '81 puntos',
    },
    {
      id: 2,
      imagen: '/src/assets/Iguazu.jpg',
      titulo: 'Vuelos a Iguazú',
      descripcion: 'Saliendo desde Buenos Aires',
      precio: '$284.303',
      puntos: '354 puntos',
    },
    {
      id: 3,
      imagen: '/src/assets/rosario.jpg',
      titulo: 'Vuelos a Rosario',
      descripcion: 'Saliendo desde Salta',
      precio: '$253.337',
      puntos: '518 puntos',
    },
    {
      id: 4,
      imagen: '/src/assets/caba.jpg',
      titulo: 'Vuelos a Buenos Aires',
      descripcion: 'Saliendo desde Neuquén',
      precio: '$222.950',
      puntos: '410 puntos',
    },
  ];

  return (
    <div className="destinos-container">
      <h2>Vuelos Destacados</h2>
      <div className="destinos-grid">
        {destinos.map((destino) => (
          <div key={destino.id} className="destino-card">
            <img src={destino.imagen} alt={destino.titulo} />
            <div className="destino-info">
              <h3>{destino.titulo}</h3>
              <p>{destino.descripcion}</p>
              <p className="precio">Precio ida y vuelta desde: {destino.precio}</p>
              <p className="puntos">Pasaporte: Sumarias {destino.puntos}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinos;
