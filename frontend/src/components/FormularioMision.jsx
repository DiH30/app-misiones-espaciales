import { useForm } from 'react-hook-form';
import { api } from '../services/api';

function FormularioMision() {

  const { register, handleSubmit, formState: { errors } } = useForm();

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
    <form onSubmit={handleSubmit(handleMision)}>
      {/* NOMBRE */}
      <input placeholder="Nombre de la misión" {...register("nombre", { required: "El nombre es obligatorio" })} />
      {errors.nombre && <p>{errors.nombre.message}</p>}

      {/* OBJETIVO */}
      <input placeholder="Objetivo" {...register("objetivo", { required: "El objetivo es obligatorio" })} />
      {errors.objetivo && <p>{errors.objetivo.message}</p>}

      {/* MODELO */}
      <input placeholder="Modelo" {...register("modelo", { required: "El modelo es obligatorio" })} />
      {errors.modelo && <p>{errors.modelo.message}</p>}

      {/* FECHA DE LANZAMIENTO */}
      <input type="datetime-local" {...register("fechaLanzamiento", { required: "La fecha de lanzamiento es obligatoria" })} />
      {errors.fechaLanzamiento && <p>{errors.fechaLanzamiento.message}</p>}

      {/* SITIO DE LANZAMIENTO */}
      <input placeholder="Sitio de lanzamiento" {...register("sitioLanzamiento", { required: "El sitio de lanzamiento es obligatorio" })} />
      {errors.sitioLanzamiento && <p>{errors.sitioLanzamiento.message}</p>}

      {/* TRIPULACIÓN */}
      <input placeholder="Tripulación (separado por comas)" {...register("tripulacion", { required: "La tripulación es obligatoria" })} />
      {errors.tripulacion && <p>{errors.tripulacion.message}</p>}

      {/* ESTADO ACTUAL */}
      <select {...register("estadoActual", { required: "El estado actual es obligatorio" })}>
        <option value="">Seleccione un estado</option>
        <option value="En curso">En curso</option>
        <option value="Completada">Completada</option>
        <option value="Fallida">Fallida</option>
        <option value="Cancelada">Cancelada</option>
      </select>
      {errors.estadoActual && <p>{errors.estadoActual.message}</p>}

      {/* TRAYECTORIA */}
      <input placeholder="Trayectoria" {...register("trayectoria", { required: "La trayectoria es obligatoria" })} />
      {errors.trayectoria && <p>{errors.trayectoria.message}</p>}

      {/* DURACIÓN ESTIMADA (opcional) */}
      <input type="number" placeholder="Duración estimada (días)" {...register("duracionEstimada")} />

      {/* VEHÍCULO DE LANZAMIENTO */}
      <input placeholder="Vehículo de lanzamiento" {...register("vehiculoLanzamiento", { required: "El vehículo de lanzamiento es obligatorio" })} />
      {errors.vehiculoLanzamiento && <p>{errors.vehiculoLanzamiento.message}</p>}

      {/* DESTINO */}
      <input placeholder="Destino" {...register("destino", { required: "El destino es obligatorio" })} />
      {errors.destino && <p>{errors.destino.message}</p>}

      {/* CARGA ÚTIL (opcional) */}
      <input placeholder="Carga útil" {...register("cargaUtil")} />

      <button type="submit" className="btn btn-secondary fw-bold w-23">Registrar Misión</button>
    </form>
  );
}

export default FormularioMision;
