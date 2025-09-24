import { login } from '../controllers/auth.controller.js';  

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Llamada al controlador
      await login(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error en el login" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}