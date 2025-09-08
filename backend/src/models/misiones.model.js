import mongoose from "mongoose";

const MisionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  objetivo: {
    type: String,
    required: true,
    trim: true
  },
  modelo: {
    type: String, // Tipo String por si el modelo tiene letras, como "F9-Block5"
    required: true,
    trim: true
  },
  fechaLanzamiento: {
    type: Date, // Date para almacenar fecha y hora
    required: true
  },
  sitioLanzamiento: {
    type: String,
    required: true,
    trim: true
  },
  tripulacion: {
    type: [String], 
    required: true
  },
  estadoActual: {
    type: String,
    enum: ["En curso", "En planificación","Completada", "Fallida", "Cancelada"],
    required: true
  },
  trayectoria: {
    type: String,
    required: true,
    trim: true
  },
  duracionEstimada: {
    type: Number, // En días, por ejemplo
    required: false
  },
  vehiculoLanzamiento: {
    type: String,
    required: true
  },
  destino: {
    type: String,
    required: true,
    trim: true
  },
  cargaUtil: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model("Mision", MisionSchema);
