//EliminarReserva.jsx
import React, { useState } from 'react';

const EliminarReserva = ({ reservaId, onReservaEliminado }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

    const eliminarReserva = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`http://localhost:8081/reserva/${reservaId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el vuelo');
      }

      const data = await response.json();
      alert(data.message || 'Vuelo eliminado con éxito');
      setShowModal(false);
      onReservaEliminado(reservaId); // Llamar a la función de callback para actualizar la lista.
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button className="btn btn-danger" onClick={() => setShowModal(true)}>
        <span className="material-symbols-outlined">Eliminar</span>
      </button>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro de que deseas eliminar esta reserva?</h3>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-danger"
                onClick={eliminarReserva}
                disabled={isLoading}
              >
                {isLoading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default EliminarReserva;
