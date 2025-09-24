import express from 'express';
import axios from 'axios'; // Importamos axios
const router = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

router.get('/images', async (req, res) => {
  const { sol = 1000, page = 1 } = req.query;

  try {
    const response = await axios.get(NASA_API_URL, {
      params: {
        sol,
        page,
        api_key: NASA_API_KEY,
      },
    });

    const data = response.data;
    if (data.photos.length === 0) {
      return res.status(200).json({ photos: [], hasMore: false });
    }
    return res.status(200).json({ photos: data.photos, hasMore: true });

  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
    return res.status(500).json({ error: "Error al obtener las imágenes de Marte." });
  }
});

export default router; // Exportamos el router como default