// src/pages/Home.jsx
// import React from 'react';
// import imagen from '../assets/noviembre2024.webp';
// import '../style/Home.css'; 


// const Home = () => {
//   return (
//     <div>
      
//       <h1>Bienvenido a la página Home</h1>
      
//       <img src={imagen} alt="imagen" width="1340" /> 
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Home.css"; // Archivo CSS para estilos personalizados

export default function Home() {
    const [vuelo, setvuelo] = useState([]);

    // Función para obtener los vuelos desde el backend
    useEffect(() => {
        const fetchvuelo = async () => {
            try {
                const response = await fetch("http://localhost:8081/vuelo"); // Cambia la URL si es necesario
                const data = await response.json();
                setvuelo(data); // Asegúrate de que el backend retorna una lista de vuelos
            } catch (error) {
                console.error("Error al obtener los vuelos:", error);
            }
        };

        fetchvuelo();
    }, []);

    return (
        <div className="home-container">
            {/* Encabezado */}
            <header className="header">
                {/* <div className="logo">CDC Airways</div> */}
                {/* <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                </nav> */}
            </header>

            {/* Imagen de fondo y mensaje principal */}
            <section className="hero">
                <div className="hero-text">
                    <h1>TU EXPERIENCIA COMIENZA AQUI</h1>
                </div>
            </section>

            {/* Lista de vuelos */}
            <section className="Lista de vuelos">
                <h2>Lista de vuelos</h2>
                <table className="flights-table">
                    <thead>
                        <tr>
                            <th>ID Vuelo</th>
                            <th>Numero Vuelo</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>ID Avión</th>
                            <th>Fecha Salida</th>
                            <th>Fecha Llegada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vuelo.map((vuelo) => (
                            <tr key={index}>
                                <td>{vuelo.id_vuelo}</td>
                                <td>{vuelo.numero_vuelo}</td>
                                <td>{vuelo.origen}</td>
                                <td>{vuelo.destino}</td>
                                <td>{vuelo.id_avion}</td>
                                <td>{new Date(vuelo.fecha_salida).toLocaleString()}</td>
                                <td>{new Date(vuelo.fecha_llegada).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

