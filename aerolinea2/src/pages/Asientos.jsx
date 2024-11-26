// pages/Asientos.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EliminarAsiento from './EliminarAsiento';
import '../style/Eliminar.css'; 
import styles from "../style/Aviones.module.css";

export default function Asiento() {
   const [asiento, setAsiento] = useState([]);

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
                setAsiento(body);
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

    // Función para actualizar la lista tras eliminar un asiento
    const onAsientoEliminado = (idEliminado) => {
      setAsiento((prevAsiento) =>
      prevAsiento.filter((asiento) => asiento.id_asiento !== idEliminado)
      );
    };

    return (
        <>
          <div className={styles['container']}>
            <h2 className={styles['h2']}>Todos los Asientos</h2>
            <Link to={`/asiento/crear/`} className={styles['btn-crear']}>
              Crear
            </Link>
          </div>
      
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th>ID Asiento</th>
                <th>ID Vuelo</th>
                <th>Numero Asiento</th>
                <th>Clase</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asiento.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles['empty']}>
                    No hay Asientos registrados
                  </td>
                </tr>
              ) : (
                asiento.map((asiento, index) => (
                  <tr 
                    key={index}
                    className={
                      index % 2 === 0 
                        ? styles['fila-par'] 
                        : styles['fila-impar']
                    }
                  >
                    <td className={styles['asientos-td']}>{asiento.id_asiento}</td>
                    <td className={styles['asientos-td']}>{asiento. id_vuelo}</td>
                    <td className={styles['asientos-td']}>{asiento.numero_asiento}</td>
                    <td className={styles['asientos-td']}>{asiento.clase}</td>
                    <td className={styles['asientos-td']}>{asiento.estado}</td>
                    <td className={`${styles['asientos-td']} ${styles['acciones']}`}>
                    <Link to={`/asiento/edit/${asiento.id}`} className={`${styles['btn-primary']}`}>
                    Editar
                    </Link>
                    <EliminarAsiento
                    asientoId={asiento.id_asiento}
                    onAsientoEliminado={onAsientoEliminado}
                    className={`${styles['btn-eliminar']}`}
                   />
                   </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
    );
      

}
