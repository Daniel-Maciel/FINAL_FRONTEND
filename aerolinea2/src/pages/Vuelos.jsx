// src/pages/Vuelo.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function Vuelo() {

  const [vuelo, setVuelo] = useState([]);

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
              const url = "http://localhost:8081/vuelo";

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


  const filas = vuelo.map((vuelo, index) => {
      return (
          <tr key={index}>
              <td>{vuelo.id_vuelo}</td>
              <td>{vuelo.numero_vuelo}</td>
              <td>{vuelo.origen}</td>
              <td>{vuelo.destino}</td>
              <td>{vuelo.id_avion}</td>
              <td>{new Date(vuelo.fecha_salida).toLocaleString()}</td>
              <td>{new Date(vuelo.fecha_llegada).toLocaleString()}</td>
              <td>
                  {<Link to={`/Vuelo/edit/${vuelo.id}`} className='btn btn-primary'>
                      <span className="material-symbols-outlined">Editar</span>
                  </Link> }

                  {<button className='btn btn-danger' onClick={() => showModal(vuelo.vuelo_id)}>
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
           <h2>Todos los Vuelos</h2>  
            <div>
              <Link to={`/vuelo/crear/`} className='btn btn-primary'>
                  <span className="material-symbols-outlined">Crear</span>
              </Link>

          </div>

          <table className='table'>
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
                  {vuelo.length === 0 ? (
                      <tr>
                          <td colSpan="5" className="text-center">No hay vuelos registrados.</td>
                      </tr>
                  ) : (
                      filas
                  )}
              </tbody>
          </table>

      </>
  )
}

 