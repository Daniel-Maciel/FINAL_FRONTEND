//CrearAvion.jsx
import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import '../style/Crear.css'; 

export default function CrearAvion() {
  const [modelo, setModelo] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [aerolinea, setAerolinea] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
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

    if (!modelo || !capacidad || !aerolinea) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/avion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: sessionStorage.getItem('token'),
        },
        body: JSON.stringify({
          modelo,
          capacidad,
          aerolinea,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // toast.success('Avion creada con éxito', toastConf);
        setAlertMessage('Avión creada con éxito');
        setAlertType('success');

        // Limpiar campos después de la creación
        setModelo('');
        setCapacidad('');
        setAerolinea('');
       } else {
        //toast.error(data.message || 'Error al crear la avion', toastConf);
        setAlertMessage(data.message || 'Error al crear el avión');
        setAlertType('error');
      }
    } catch (error) {
      //toast.error(`Error: ${error.message}`, toastConf);
      setAlertMessage(`Error: ${error.message}`);
      setAlertType('error');
    }
    setTimeout(() => {
        setAlertMessage('');
      }, 3000);

  };

  return (
    <div className="crear-Avión-container">
      <h2>Crear Nuevo Avión</h2>
      <form onSubmit={handleSubmit}>
      

        <div className="form-group">
          <label>Modelo</label>
          <select
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value='Airbus A320'>Airbus A320</option>
            <option value='Airbus A321'>Airbus A321</option>
            <option value='Airbus A330'>Airbus A330</option>
            <option value='Boeing 737'>Boeing 737</option>
            <option value='Boeing 767'>Boeing 767</option>
            <option value='Boeing 777'>Boeing 777</option>
            <option value='Boeing 787'>Boeing 787</option>
            <option value='Bombardier CRJ-900'>Bombardier CRJ-900</option>
            <option value='Embraer E175'>Embraer E175</option>
            <option value='Embraer E190'>Embraer E190</option>
          </select>
        </div>
        <div className="form-group">
          <label>Capacidad</label>
          <input
            type="number"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            placeholder="Ingrese la Capacidad del Avión"
          />
        </div>
        <div className="form-group">
          <label>Aerolinea</label>
          <select
            value={aerolinea}
            onChange={(e) => setAerolinea(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value='Aerolíneas Argentinas'>Aerolíneas Argentinas</option>
            <option value='Austral Líneas Aéreas'>Austral Líneas Aéreas</option>
            <option value='Flybondi'>Flybondi</option>
            <option value='JetSmart Argentina'>JetSmart Argentina</option>
            <option value='LATAM Airlines'>LATAM Airlines</option>
            <option value='Turkish Airlines'>Turkish Airlines</option>
          </select>
        </div>
              
        {error && <p className="error">{error}</p>}

        <button type="submit">Crear Avión</button>
      {/* Mostrar mensaje de alerta si alertMessage tiene contenido */}
      {alertMessage && (
          <div
            role="alert"
            className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'}`}
          >
            {alertMessage}
          </div>
        )}

      </form>
    </div>
  );
}
