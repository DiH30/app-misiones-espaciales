import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { config } from "dotenv"
import misionesRouter from "./routes/misiones.routes.js"
import authRoutes from "./routes/auth.routes.js"

config()

const PORT = process.env.PORT
const app = express()

app.use( express.json() )
app.use( cors() )
app.use("/api/misiones", misionesRouter)
app.use( "/api", authRoutes )

mongoose.connect(process.env.MONGO_KEY).then( () => console.log( "Conectado a MongoDB" ) )

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto", PORT)
})
