// Aviones.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EliminarAvion from './EliminarAvion';
import '../style/Eliminar.css'; 
import styles from "../style/Aviones.module.css"; // CSS Modules

export default function Avion() {
  const [avion, setAvion] = useState([]);

  const toastConf = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  };

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
        const url = "http://localhost:8081/avion";

        let response = await fetch(url, parametros);
        let body = await response.json();

        if (response.ok) {
          setAvion(body);
        } else {
          toast.error(body.message, toastConf);
        }
      } catch (error) {
        toast.error(error.message, toastConf);
      }
    }
    obtenerDatos();
  }, []);

  // Función para actualizar la lista tras eliminar un avión
  const onAvionEliminado = (idEliminado) => {
    setAvion((prevAvion) =>
      prevAvion.filter((avion) => avion.id_avion !== idEliminado)
    );
  };

  return (
    <>
      <div className={styles['container']}>
        <h2 className={styles['h2']}>Lista de Aviones</h2>
        <Link to={`/aviones/crear/`} className={styles['btn-crear']}>
          Crear
        </Link>
      </div>
      <div className={styles['container']}>
        <table className={styles["table"]}>
        <thead>
          <tr>
            <th>ID Avión</th>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th>Aerolínea</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {avion.length === 0 ? (
            <tr>
              <td colSpan="5" className={styles['empty']}>
                No hay aviones registrados
              </td>
            </tr>
          ) : (
            avion.map((avion, index) => (
              <tr 
                key={index}
                className={
                  index % 2 === 0 
                    ? styles['fila-par'] 
                    : styles['fila-impar']
                }
              >
                <td className={styles['aviones-td']}>{avion.id_avion}</td>
                <td className={styles['aviones-td']}>{avion.modelo}</td>
                <td className={styles['aviones-td']}>{avion.capacidad}</td>
                <td className={styles['aviones-td']}>{avion.aerolinea}</td>
                <td className={`${styles['aviones-td']} ${styles['acciones']}`}>
                <Link to={`/avion/edit/${avion.id}`} className={`${styles['btn-primary']}`}>
                Editar
                </Link>
                <EliminarAvion
                avionId={avion.id_avion}
                onAvionEliminado={onAvionEliminado}
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