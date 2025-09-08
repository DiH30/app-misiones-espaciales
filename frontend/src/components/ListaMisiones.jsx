import { useEffect, useState } from 'react';
import { api } from '../services/api';
import './ListaMisiones.css';


function ListaMisiones() {

  const [misiones, setMisiones] = useState([]);

  useEffect(() => {
    api.get('/misiones') 
      .then(res => setMisiones(res.data))
      .catch(err => {
        console.error('Error al obtener las misiones:', err.response?.status, err.message);
      });
  }, []);

  return (
    <div className="misiones-container">
      <h2 className="misiones-title"> Misiones 👩‍🚀 🚀</h2>
      <ul className="misiones-list">
        {misiones.map(mision => (
          <li key={mision._id} className="mision-card">
            <h3 className="mision-name">{mision.nombre}</h3>
            <div className="mision-detail">
              <strong>Objetivo:</strong> {mision.objetivo}
            </div>
            <div className="mision-detail">
              <strong>Modelo:</strong> {mision.modelo}
            </div>
            <div className="mision-detail">
              <strong>Fecha de lanzamiento:</strong> {new Date(mision.fechaLanzamiento).toLocaleDateString()}
            </div>
            <div className="mision-detail">
              <strong>Sitio de lanzamiento:</strong> {mision.sitioLanzamiento}
            </div>
            <div className="mision-detail">
              <strong>Tripulación:</strong> {mision.tripulacion.join(', ')}
            </div>
            <div className="mision-detail">
              <strong>Estado actual:</strong> {mision.estadoActual}
            </div>
            <div className="mision-detail">
              <strong>Trayectoria:</strong> {mision.trayectoria}
            </div>
            <div className="mision-detail">
              <strong>Duración estimada:</strong> {mision.duracionEstimada ? mision.duracionEstimada + ' días' : 'No especificada'}
            </div>
            <div className="mision-detail">
              <strong>Vehículo de lanzamiento:</strong> {mision.vehiculoLanzamiento}
            </div>
            <div className="mision-detail">
              <strong>Destino:</strong> {mision.destino}
            </div>
            <div className="mision-detail">
              <strong>Carga útil:</strong> {mision.cargaUtil || 'No especificada'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaMisiones;
