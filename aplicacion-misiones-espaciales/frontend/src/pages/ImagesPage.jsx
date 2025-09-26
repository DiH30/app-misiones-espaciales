import { useState, useEffect } from "react";
import "../styles/styles.css";

export const ImagesPage = () => {
  const [images, setImages] = useState([]); // Estado para las imágenes
  const [sol, setSol] = useState(1000);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);// Estado para el manejo de errores
  const [hasMore, setHasMore] = useState(true); // Estado para el estado de carga


  const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
  //const NASA_API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`;
  const fetchMarsImages = async (solToFetch, pageToFetch) => {
    setLoading(true);
    setError(null);
    try {
      const NASA_API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solToFetch}&page=${pageToFetch}&api_key=${NASA_API_KEY}`;
      const response = await fetch(NASA_API_URL);
      if (!response.ok) {
        throw new Error("Error al obtener las imágenes de Marte.");
      }
      const data = await response.json();
      console.log("Fotografías recibidas:", data.photos);

      if (data.photos.length === 0) {
        // Si no hay fotos en esta página, indica que no hay más
        setHasMore(false);
        if (pageToFetch === 1) {
          setImages([]); // Si es la primera página, limpia imágenes
        }
        return;
      }

      if (pageToFetch === 1) {
        // Si es la primera página, reemplaza imágenes
        setImages(data.photos);
      } else {
        // Si es página siguiente, agrega más imágenes
        setImages((prev) => [...prev, ...data.photos]);
      }

      setHasMore(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar imágenes cuando cambie sol o página
  useEffect(() => {
    fetchMarsImages(sol, page);
  }, [sol, page]);

  // Manejar cambio en input sol
  const handleSolChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setSol(value);
      setPage(1); // Reiniciar página al cambiar sol
      setHasMore(true);
    }
  };

  // Cargar más imágenes (paginación)
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <main className="images-container">
      <h2 className="images-title">🪐 Imágenes de Marte por Curiosity</h2>
      
      <label htmlFor="sol-input" className="label-sol">
        Día marciano (sol):
        <input
          type="number"
          id="sol-input"
          value={sol}
          onChange={handleSolChange}
          min="0"
          className="sol-input"
        />
      </label>

      {loading && page === 1 && (
        <div className="spinner" role="status" aria-live="polite">
          🔄 Cargando imágenes...
        </div>
      )}

      {error && <div className="error-message">Error: {error}</div>}

      {!loading && images.length === 0 && (
        <div>No se encontraron imágenes para este sol.</div>
      )}

      <div className="images-grid">
        {images.map((image) => (
          <article className="image-card" key={image.id}>
            <img
              src={image.img_src}
              alt={`Foto tomada por la cámara ${image.camera.full_name} el ${image.earth_date}`}
              className="image-img"
              loading="lazy"
            />
            <p>Fecha en la Tierra: {image.earth_date}</p>
            <p>Cámara: {image.camera.full_name}</p>
          </article>
        ))}
      </div>

      {hasMore && !loading && (
        <button onClick={handleLoadMore} className="load-more-button">
          Cargar más
        </button>
      )}

      {loading && page > 1 && (
        <div className="spinner" role="status" aria-live="polite">
          🔄 Cargando más imágenes...
        </div>
      )}
    </main>
  );
};