// Reservas.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Reservas() {

  const [reserva, setReservas] = useState([]);

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
              const url = "http://localhost:8081/reserva";

              let response = await fetch(url, parametros)
              let body = await response.json();

              if (response.ok) {
                  setReservas(body);
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


  const filas = reserva.map((reserva, index) => {
      return (
          <tr key={index}>
              <td>{reserva.id_reserva}</td>
              <td>{reserva.id_usuario}</td>
              <td>{reserva.id_vuelo}</td>
              <td>{reserva.monto}</td>
              <td>{reserva.metodo_pago}</td>
              <td>{new Date(reserva.fecha_reserva).toLocaleString()}</td>
              <td>{reserva.estado}</td>
              <td>{reserva.id_asiento}</td>
              <td>
                  {<Link to={`/reserva/edit/${reserva.id}`} className='btn btn-primary'>
                      <span className="material-symbols-outlined">Editar</span>
                  </Link> }

                  {<button className='btn btn-danger' onClick={() => showModal(reserva.id_reserva)}>
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

              <Link to={`/reservas/crear/`} className='btn btn-primary'>
                  <span className="material-symbols-outlined">Crear</span>
              </Link>

          </div>

          <table className='table'>
              <thead>
                  <tr>
                     
                      <th>ID Reserva</th>
                      <th>ID Usuario</th>
                      <th>ID Vuelo</th>
                      <th>Monto</th>
                      <th>Metodo Pago</th>
                      <th>Fecha Reserva</th>
                      <th>Estado</th>
                      <th>ID Asiento</th>
                     </tr>
              </thead>
              <tbody>
                  {reserva.length === 0 ? (
                      <tr>
                          <td colSpan="5" className="text-center">No hay reservas registradas.</td>
                      </tr>
                  ) : (
                      filas
                  )}
              </tbody>
          </table>

      </>
  )
}

 