import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { config } from "dotenv"
import misionesRouter from "../routes/misiones.routes.js"
import authRoutes from "../routes/auth.routes.js"
import imagesRoutes from "../routes/images.routes.js"
import cookieParser from "cookie-parser"

config();

const PORT = process.env.PORT
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      'https://app-misiones-espaciales-5pvc.vercel.app',  // Frontend en producción
      'http://localhost:5173',                  // Frontend en desarrollo
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }))
app.use(cookieParser());

// Rutas
app.use("/api/misiones", misionesRouter)
app.use("/api", authRoutes)
app.use('/api', imagesRoutes);

// Conexión a MongoDB 
mongoose.connect(process.env.MONGO_KEY).then(() => console.log("Conectado a MongoDB"))

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto", PORT)
})

export default app;