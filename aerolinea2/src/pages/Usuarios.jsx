//Usuarios.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  styles from '../style/Usuarios.module.css'; 


export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const idRol = sessionStorage.getItem('id_rol');
  const isAdmin = idRol === '2';

  useEffect(() => {
    if (isAdmin) {
      async function obtenerUsuarios() {
        try {
          const response = await fetch('http://localhost:8081/usuario', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': sessionStorage.getItem('token'),
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsuarios(data);
          } else {
            const errorData = await response.json();
            setError(errorData.error || 'Error al cargar los usuarios');
          }
        } catch (error) {
          setError(error.message);
        }
      }
      obtenerUsuarios();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return <p className={styles['usuarios-error']}>No tienes permisos para ver esta página.</p>;
  }

  return (
    <div className={styles['usuarios-container']}>
      <h2 className={styles['usuarios-h2']}>Lista de Usuarios</h2>
      {error && <p className={styles['usuarios-error']}>{error}</p>}
      <table className={styles['usuarios-table']}>
        <thead className={styles['usuarios-thead']}>
          <tr>
            <th>ID Usuario</th>
            <th>Email</th>
            <th>Fecha Registro</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody className={styles['usuarios-tbody']}>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="4" className={styles['usuarios-empty']}>
                No hay usuarios registrados.
              </td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <tr key={usuario.id_usuario}>
                <td>{usuario.id_usuario}</td>
                <td>{usuario.email}</td>
                <td>{usuario.fecha_registro}</td>
                <td>{usuario.id_rol === 2 ? 'Admin' : 'Usuario'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}