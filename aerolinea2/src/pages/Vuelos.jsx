// src/pages/Vuelo.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EliminarVuelo from './EliminarVuelo';
import '../style/Eliminar.css'; 
import styles from "../style/Vuelos.module.css";

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
                authorization: sessionStorage.getItem('token')
              }
            };
            const url = "http://localhost:8081/vuelo";

            let response = await fetch(url, parametros)
            let body = await response.json();

            if (response.ok) {
               setVuelo(body);
            }  else {
               toast.error(body.message, toastConf);
            }
            } catch (error) {
              toast.error(error.message, toastConf);
            }
        }
        obtenerDatos();
    },   []);

  // Función para actualizar la lista tras eliminar un avión
    const onVueloEliminado = (idEliminado) => {
      setVuelo((prevVuelo) =>
        prevVuelo.filter((vuelo) => vuelo.id_vuelo !== idEliminado)
      );
    };

    return (
        <>
          <div className={styles['container']}>
            <h2 className={styles['h2']}>Lista de Vuelos</h2>
            <Link to={`/aviones/crear/`} className={styles['btn-crear']}>
              Crear
            </Link>
          </div>
           
           <div className={styles['container']}>
           <table className={styles["table"]}>
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
                  <td colSpan="8" className={styles['empty']}>
                    No hay vuelos registrados
                  </td>
                </tr>
              ) : (
                vuelo.map((vuelo, index) => (
                  <tr 
                    key={index}
                    className={
                      index % 2 === 0 
                        ? styles['fila-par'] 
                        : styles['fila-impar']
                    }
                  >
                    <td className={styles['vuelos-td']}>{vuelo.id_vuelo}</td>
                    <td className={styles['vuelos-td']}>{vuelo.numero_vuelo}</td>
                    <td className={styles['avuelos-td']}>{vuelo.origen}</td>
                    <td className={styles['vuelos-td']}>{vuelo.destino}</td>
                    <td className={styles['vuelos-td']}>{vuelo.id_avion}</td>
                    <td className={styles['vuelos-td']}>{new Date(vuelo.fecha_salida).toLocaleString()}</td>
                    <td className={styles['vuelos-td']}>{new Date(vuelo.fecha_llegada).toLocaleString()}</td>
                    <td className={`${styles['vuelos-td']} ${styles['acciones']}`}>
                    <Link to={`/vuelo/edit/${vuelo.id}`} className={`${styles['btn-primary']}`}>
                    Editar
                    </Link>
                    <EliminarVuelo
                    vueloId={vuelo.id_vuelo}
                    onAvionEliminado={onVueloEliminado}
                    className={`${styles['btn-eliminar']}`}
                   />
                   </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </>
    );
      
}
