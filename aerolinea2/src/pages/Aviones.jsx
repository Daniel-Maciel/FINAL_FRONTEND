// pages/Aviones.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Avion() {

  const [avion, setVuelo] = useState([]);

  const toastConf = {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
  }

  useEffect(() => {

      async function obtenerDatos() {
          try {
              const parametros = {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'authorization': sessionStorage.getItem('token')
                  }
              }
              const url = "http://localhost:8081/avion";

              let response = await fetch(url, parametros)
              let body = await response.json();

              if (response.ok) {
                  setVuelo(body);
              } else {
                  toast.error(body.message, toastConf);
              }
          } catch (error) {
              toast.error(error.message, toastConf);
          }
      }
      obtenerDatos();
  },
      []
  );


  const filas = avion.map((avion, index) => {
      return (
          <tr key={index}>
              <td>{avion.id_avion}</td>
              <td>{avion.modelo}</td>
              <td>{avion.capacidad}</td>
              <td>{avion.aerolinea}</td>
              <td>
                  {<Link to={`/avion/edit/${avion.id}`} className='btn btn-primary'>
                      <span className="material-symbols-outlined">Editar</span>
                  </Link> }

                  {<button className='btn btn-danger' onClick={() => showModal(avion.avion_id)}>
                      <span className="material-symbols-outlined">
                          Eliminar
                      </span>
                  </button> }
              </td>
          </tr>
      )

  });

  return (
      <>
          <div>

              <Link to={`/avion/crear/`} className='btn btn-primary'>
                  <span className="material-symbols-outlined">Crear</span>
              </Link>

          </div>

          <table className='table'>
              <thead>
                  <tr>
                     
                      <th>ID Avion</th>
                      <th>Modelo</th>
                      <th>Capacidad</th>
                      <th>Aerolinea</th>
                                  
                     </tr>
              </thead>
              <tbody>
                  {avion.length === 0 ? (
                      <tr>
                          <td colSpan="5" className="text-center">No hay aviones registrados.</td>
                      </tr>
                  ) : (
                      filas
                  )}
              </tbody>
          </table>

      </>
  )
}
