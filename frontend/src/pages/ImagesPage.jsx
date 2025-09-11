import { useState, useEffect } from "react";
import "./ImagePage.css"; 

export const ImagesPage = () => {
  const [images, setImages] = useState([]); // Estado para las imágenes
  const [loading, setLoading] = useState(true); // Estado para el estado de carga
  const [error, setError] = useState(null); // Estado para el manejo de errores

  const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const NASA_API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`; 

  useEffect(() => {
    // Hacer la solicitud a la API de la NASA
    fetch(NASA_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las imágenes de Marte.");
        }
        return response.json();
      })
      .then((data) => {
        setImages(data.photos); // Guardamos las fotos en el estado
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // En caso de error, actualizamos el estado de error
        setLoading(false);
      });
  }, []); // Este hook solo se ejecuta una vez, al montar el componente

  if (loading) {
    return <div>Cargando imágenes...</div>; // Mensaje de carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Mensaje de error
  }

  return (
    <div className="images-container">
      <h2 className="images-title">Imágenes de Marte por Curiosity</h2>

      <div className="images-grid">
        {images.map((image, index) => (
          <div className="image-card" key={index}>
            <img
              src={image.img_src}
              alt={`Imagen ${index + 1}`}
              className="image-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};