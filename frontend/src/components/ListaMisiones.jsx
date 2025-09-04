import { useEffect, useState } from 'react';
import { api } from '../services/api';

function ListaMisiones() {

  const [misiones, setMisiones] = useState([]);

   useEffect(() => {
    api.get('/misiones') 
      .then(res => setMisiones(res.data))
      .catch(err => {
        console.error('Error al obtener las misiones:', err.response?.status, err.message);
      });
  }, []);

  /*useEffect(() => {
    api.get('/').then(res => setMisiones(res.data));
  }, ); */

  return (

    <div>
      <h2 class="text-primary">Lista de Misiones 👩‍🚀 🚀 🌌</h2>
      <ul>
        {misiones.map(mision => (
          <li key={mision._id}>
            <strong>{mision.nombre}</strong><br />
            <strong>Objetivo:</strong> {mision.objetivo}<br />
            <strong>Modelo:</strong> {mision.modelo}<br />
            <strong>Fecha de lanzamiento:</strong> {new Date(mision.fechaLanzamiento).toLocaleDateString()}<br />
            <strong>Sitio de lanzamiento:</strong> {mision.sitioLanzamiento}<br />
            <strong>Tripulación:</strong> {mision.tripulacion.join(', ')}<br />
            <strong>Estado actual:</strong> {mision.estadoActual}<br />
            <strong>Trayectoria:</strong> {mision.trayectoria}<br />
            <strong>Duración estimada:</strong> {mision.duracionEstimada ? mision.duracionEstimada + ' días' : 'No especificada'}<br />
            <strong>Vehículo de lanzamiento:</strong> {mision.vehiculoLanzamiento}<br />
            <strong>Destino:</strong> {mision.destino}<br />
            <strong>Carga útil:</strong> {mision.cargaUtil || 'No especificada'}<br />
          </li>
        ))}
      </ul>
    </div>

  );

}

export default ListaMisiones;
