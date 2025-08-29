
import { Router } from "express";
import Mision from "../models/misiones.model.js";

const router = Router()

// Crear mision
router.post('/', async (req, res) => {
  const nuevaMision = new Mision(req.body)
  await nuevaMision.save()
  res.json(nuevaMision)
})

// Obtener todas las misiones
router.get('/', async (req, res) => {
  const misiones = await Mision.find()
  res.json(misiones)
})

// Modificar mision
router.put('/:id', async (req, res) => {
  const misionActualizada = await Mision.findByIdAndUpdate(req.params.id, req.body,
    { new: true })
  res.json(misionActualizada)
})
// Borrar mision
router.delete('/:id', async (req, res) => {
  await Mision.findByIdAndDelete(req.params.id)
  res.json({message: "Mision eliminada"})
})

export default router