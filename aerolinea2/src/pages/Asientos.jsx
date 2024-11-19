// pages/Asientos.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Asiento() {

  const [asiento, setVuelo] = useState([]);

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
              const url = "http://localhost:8081/asiento";

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


  const filas = asiento.map((asiento, index) => {
      return (
          <tr key={index}>
              <td>{asiento.id_asiento}</td>
              <td>{asiento.id_vuelo}</td>
              <td>{asiento.numero_asiento}</td>
              <td>{asiento.clase}</td>
              <td>{asiento.estado}</td>
              <td>
                  {<Link to={`/asiento/edit/${asiento.id}`} className='btn btn-primary'>
                      <span className="material-symbols-outlined">Editar</span>
                  </Link> }

                  {<button className='btn btn-danger' onClick={() => showModal(asiento.asiento_id)}>
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

              <Link to={`/asiento/crear/`} className='btn btn-primary'>
                  <span className="material-symbols-outlined">Crear</span>
              </Link>

          </div>

          <table className='table'>
              <thead>
                  <tr>
                     
                      <th>ID Asiento</th>
                      <th>ID Vuelo</th>
                      <th>Numero Asiento</th>
                      <th>Clase</th>
                      <th>Estado</th>
                               
                     </tr>
              </thead>
              <tbody>
                  {asiento.length === 0 ? (
                      <tr>
                          <td colSpan="5" className="text-center">No hay asiento registrado</td>
                      </tr>
                  ) : (
                      filas
                  )}
              </tbody>
          </table>

      </>
  )
}

 
