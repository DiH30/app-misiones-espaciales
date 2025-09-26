import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { api } from '../services/api';
import './FormularioMision.css';

function FormularioMision() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [clave, setClave] = useState('');
  const [autorizado, setAutorizado] = useState(false);


  const verificarClave = () => {
    const claveCorrecta = import.meta.env.VITE_CLAVE_SECRETA;
    if (clave === claveCorrecta) {
      setAutorizado(true);
    } else {
      alert('Clave incorrecta');
    }
  };

  const handleMision = async (data) => {
    // Convierte la fecha a tipo Date
    data.fechaLanzamiento = new Date(data.fechaLanzamiento);

    // Convierte tripulación en arreglo si es string separado por comas
    data.tripulacion = data.tripulacion.split(',').map(member => member.trim());

    console.log(data);

    // Enviar los datos al backend para registrarlos
    try {
      await api.post('/misiones', data); // Envía el formulario a la ruta /misiones
      console.log('Misión registrada:', data);

      // Redirigir a la lista de misiones
      window.location.href = "/misiones";

    } catch (error) {
      console.error('Error al registrar la misión:', error);
    }
  };


  return (
    autorizado ? (
      <form onSubmit={handleSubmit(handleMision)} className="form-container" >
        <h1 className="form-title">Registro de Misión Espacial 🚀</h1>


        {/* NOMBRE */}
        <div className="form-group" >
          <label>Nombre de la Misión</label>
          <input
            type="text"
            placeholder="Nombre de la misión"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && <p className="error">{errors.nombre.message}</p>
          }
        </div >

        {/* OBJETIVO */}
        < div className="form-group" >
          <label>Objetivo</label>
          <input
            type="text"
            placeholder="Objetivo"
            {...register("objetivo", { required: "El objetivo es obligatorio" })}
          />
          {errors.objetivo && <p className="error">{errors.objetivo.message}</p>}
        </div >

        {/* MODELO */}
        < div className="form-group" >
          <label>Modelo</label>
          <input
            type="text"
            placeholder="Modelo"
            {...register("modelo", { required: "El modelo es obligatorio" })}
          />
          {errors.modelo && <p className="error">{errors.modelo.message}</p>}
        </div >

        {/* FECHA DE LANZAMIENTO */}
        < div className="form-group" >
          <label>Fecha de Lanzamiento</label>
          <input
            type="datetime-local"
            {...register("fechaLanzamiento", { required: "La fecha de lanzamiento es obligatoria" })}
          />
          {errors.fechaLanzamiento && <p className="error">{errors.fechaLanzamiento.message}</p>}
        </div >

        {/* SITIO DE LANZAMIENTO */}
        < div className="form-group" >
          <label>Sitio de Lanzamiento</label>
          <input
            type="text"
            placeholder="Sitio de lanzamiento"
            {...register("sitioLanzamiento", { required: "El sitio de lanzamiento es obligatorio" })}
          />
          {errors.sitioLanzamiento && <p className="error">{errors.sitioLanzamiento.message}</p>}
        </div >

        {/* TRIPULACIÓN */}
        < div className="form-group" >
          <label>Tripulación</label>
          <input
            type="text"
            placeholder="Tripulación (separado por comas)"
            {...register("tripulacion", { required: "La tripulación es obligatoria" })}
          />
          {errors.tripulacion && <p className="error">{errors.tripulacion.message}</p>}
        </div >

        {/* ESTADO ACTUAL */}
        < div className="form-group" >
          <label>Estado Actual</label>
          <select {...register("estadoActual", { required: "El estado actual es obligatorio" })}>
            <option value="">Seleccione un estado</option>
            <option value="En curso">En curso</option>
            <option value="En planificación">En planificación</option>
            <option value="Completada">Completada</option>
            <option value="Fallida">Fallida</option>
            <option value="Cancelada">Cancelada</option>
          </select>
          {errors.estadoActual && <p className="error">{errors.estadoActual.message}</p>}
        </div >

        {/* TRAYECTORIA */}
        < div className="form-group" >
          <label>Trayectoria</label>
          <input
            type="text"
            placeholder="Trayectoria"
            {...register("trayectoria", { required: "La trayectoria es obligatoria" })}
          />
          {errors.trayectoria && <p className="error">{errors.trayectoria.message}</p>}
        </div >

        {/* DURACIÓN ESTIMADA (opcional) */}
        < div className="form-group" >
          <label>Duración Estimada (días)</label>
          <input
            type="number"
            placeholder="Duración estimada (días)"
            {...register("duracionEstimada")}
          />
        </div >

        {/* VEHÍCULO DE LANZAMIENTO */}
        < div className="form-group" >
          <label>Vehículo de Lanzamiento</label>
          <input
            type="text"
            placeholder="Vehículo de lanzamiento"
            {...register("vehiculoLanzamiento", { required: "El vehículo de lanzamiento es obligatorio" })}
          />
          {errors.vehiculoLanzamiento && <p className="error">{errors.vehiculoLanzamiento.message}</p>}
        </div >

        {/* DESTINO */}
        < div className="form-group" >
          <label>Destino</label>
          <input
            type="text"
            placeholder="Destino"
            {...register("destino", { required: "El destino es obligatorio" })}
          />
          {errors.destino && <p className="error">{errors.destino.message}</p>}
        </div >

        {/* CARGA ÚTIL (opcional) */}
        < div className="form-group" >
          <label>Carga Útil</label>
          <input
            type="text"
            placeholder="Carga útil"
            {...register("cargaUtil")}
          />
        </div >

        <button type="submit" className="btn-submit">Registrar Misión</button>

      </form >

    ) : (
      <div className="form-group-clave">
        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          placeholder="Ingrese la clave"
          className="input-clave"
        />
        <button 
        type="button" 
        onClick={verificarClave} 
        className="btn-verificar-clave">
          Verificar Clave
        </button>
      </div>
    )
  );
}

export default FormularioMision;