// Reservas.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/Reservas.css';

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const toastConf = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  // Función para obtener las reservas desde el backend
  useEffect(() => {
    const obtenerReservas = async () => {
      setCargando(true);
      try {
        const response = await fetch('http://localhost:8081/reserva', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: sessionStorage.getItem('token'),
          },
        });

        const data = await response.json();

        if (response.ok) {
          setReservas(data);
          console.log('Reservas obtenidas:', data);
        } else {
          toast.error(data.message || 'Error al obtener reservas', toastConf);
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`, toastConf);
      } finally {
        setCargando(false);
      }
    };

    obtenerReservas();
  }, []);

  // Función para eliminar una reserva
  const eliminarReserva = async (id) => {
    try {
        const response = await fetch(`http://localhost:8081/reserva/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: sessionStorage.getItem('token'),
            },
        });

        const result = await response.json();
        
        if (response.ok) {
            // Mostrar mensaje de éxito si la reserva fue eliminada
            toast.success(`Reserva con ID: ${id} eliminada con éxito.`, toastConf);
            
            // Actualizar el estado para quitar la reserva eliminada
            setReservas((prev) => prev.filter((reserva) => reserva.id_reserva !== id));
        } else {
            // Mostrar error si no fue posible eliminar la reserva
            toast.error(result.message || 'Error al eliminar reserva', toastConf);
        }
    } catch (error) {
        // Mostrar error si ocurrió un problema al realizar la petición
        toast.error(`Error al eliminar reserva: ${error.message}`, toastConf);
    }
   };


  // Función para cancelar una reserva
  const cancelarReserva = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/reserva/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ estado: 'cancelado' }),
      });

      if (response.ok) {
        toast.success(`Reserva con ID: ${id} cancelada con éxito.`, toastConf);
        setReservas((prev) =>
          prev.map((reserva) =>
            reserva.id_reserva === id ? { ...reserva, estado: 'cancelado' } : reserva
          )
        );
      } else {
        const error = await response.json();
        toast.error(error.message, toastConf);
      }
    } catch (error) {
      toast.error(`Error al cancelar reserva: ${error.message}`, toastConf);
    }
  };

  // Función para editar el monto de una reserva
  const editarReserva = async (id) => {
    const nuevoMonto = prompt('Ingrese el nuevo monto de la reserva:');
    if (!nuevoMonto) return;

    try {
      const response = await fetch(`http://localhost:8081/reserva/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ monto: nuevoMonto }),
      });

      if (response.ok) {
        toast.success(`Reserva con ID: ${id} actualizada con éxito.`, toastConf);
        setReservas((prev) =>
          prev.map((reserva) =>
            reserva.id_reserva === id ? { ...reserva, monto: nuevoMonto } : reserva
          )
        );
      } else {
        const error = await response.json();
        toast.error(error.message, toastConf);
      }
    } catch (error) {
      toast.error(`Error al editar reserva: ${error.message}`, toastConf);
    }
  };

  // Filtrar reservas por estado
  const reservasConfirmadas = reservas.filter((r) => r.estado === 'Confirmada');
  const reservasPendientes = reservas.filter((r) => r.estado === 'Pendiente');

  // Renderizar filas de la tabla
  const renderFilas = (reservas, acciones) =>
    reservas.map((reserva) => (
      <tr key={reserva.id_reserva}>
        <td>{reserva.id_reserva}</td>
        <td>{reserva.id_usuario}</td>
        <td>{reserva.id_vuelo}</td>
        <td>{reserva.monto}</td>
        <td>{reserva.metodo_pago}</td>
        <td>{new Date(reserva.fecha_reserva).toLocaleString()}</td>
        <td>{reserva.estado}</td>
        <td>{reserva.id_asiento}</td>
        <td>{acciones(reserva)}</td>
      </tr>
    ));

  if (cargando) return <p>Cargando reservas...</p>;

  return (
    <>
      <div className="boton-crear">
        <Link to={`/reservas/crear`} className="btn btn-primary">
          <span className="material-symbols-outlined">Crear</span>
        </Link>
      </div>

      <div className="tabla-reservas">
        <h2>Reservas Confirmadas</h2>
        <table className="table">
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservasConfirmadas.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No hay reservas confirmadas.
                </td>
              </tr>
            ) : (
              renderFilas(reservasConfirmadas, (reserva) => (
                <>
                  <button
                    className="btn btn-warning"
                    onClick={() => cancelarReserva(reserva.id_reserva)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarReserva(reserva.id_reserva)}
                  >
                    Eliminar
                  </button>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="tabla-reservas">
        <h2>Reservas Pendientes</h2>
        <table className="table">
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservasPendientes.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No hay reservas pendientes.
                </td>
              </tr>
            ) : (
              renderFilas(reservasPendientes, (reserva) => (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => editarReserva(reserva.id_reserva)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarReserva(reserva.id_reserva)}
                  >
                    Eliminar
                  </button>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
