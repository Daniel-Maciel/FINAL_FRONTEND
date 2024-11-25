// CrearReserva.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/Crear.css'; 

export default function CrearReserva() {
  const [id_usuario, setIdUsuario] = useState('');
  const [id_vuelo, setIdVuelo] = useState('');
  const [monto, setMonto] = useState('');
  const [metodo_pago, setMetodoPago] = useState('');
  const [id_asiento, setIdAsiento] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!id_usuario || !id_vuelo || !monto || !metodo_pago || !id_asiento) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/reserva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: sessionStorage.getItem('token'),
        },
        body: JSON.stringify({
          id_usuario,
          id_vuelo,
          monto,
          metodo_pago,
          estado: 'pendiente',
          id_asiento,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Reserva creada con éxito', toastConf);
        // Limpiar campos después de la creación
        setIdUsuario('');
        setIdVuelo('');
        setMonto('');
        setMetodoPago('');
        setIdAsiento('');
      } else {
        toast.error(data.message || 'Error al crear la reserva', toastConf);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, toastConf);
    }
  };

  return (
    <div className="crear-reserva-container">
      <h2>Crear Nueva Reserva</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID Usuario</label>
          <input
            type="text"
            value={id_usuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            placeholder="Ingrese el ID del usuario"
          />
        </div>
        <div className="form-group">
          <label>ID Vuelo</label>
          <input
            type="text"
            value={id_vuelo}
            onChange={(e) => setIdVuelo(e.target.value)}
            placeholder="Ingrese el ID del vuelo"
          />
        </div>
        <div className="form-group">
          <label>Monto</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Ingrese el monto"
          />
        </div>
        <div className="form-group">
          <label>Metodo de Pago</label>
          <select
            value={metodo_pago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value='TCredito'>Tarjeta Credito</option>
            <option value='Debito'>Debito</option>
            <option value='Transferencia'>Transferencia</option>
            <option value='Efectivo'>Efectivo</option>
          </select>
        </div>
        <div className="form-group">
          <label>ID Asiento</label>
          <input
            type="text"
            value={id_asiento}
            onChange={(e) => setIdAsiento(e.target.value)}
            placeholder="Ingrese el ID del asiento"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Crear Reserva</button>
      </form>
    </div>
  );
}
