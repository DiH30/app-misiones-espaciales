import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // ✅ Importamos Axios
import './HomePage.css';  // Importando el archivo CSS

export const HomePage = () => {
  const [nasaData, setNasaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // ✅ Hook para navegación

  const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const obtenerFecha = (offsetDias = 0) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - offsetDias);
    return fecha.toISOString().split('T')[0];
  };

  const fetchData = async (fecha) => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${fecha}`
      );
      console.log("Datos recibidos de la API de NASA:", response.data);
      return response.data;
    } catch (err) {
      console.error('Error al obtener datos de la NASA:', err);
      return null;
    }
  };

  useEffect(() => {
    if (!NASA_API_KEY) {
      setError("Clave de API de la NASA no configurada.");
      setLoading(false);
      return;
    }

    const cargarDatos = async () => {
      const hoy = obtenerFecha(0);
      let data = await fetchData(hoy);

      if (
        !data ||
        !data.url ||
        (data.media_type !== 'image' && data.media_type !== 'video')
      ) {
        console.warn('Contenido no válido para hoy. Intentando con la imagen de ayer...');
        const ayer = obtenerFecha(1);
        data = await fetchData(ayer);
      }

      if (data && data.url) {
        setNasaData(data);
      } else {
        setError("No se pudo cargar contenido válido desde la NASA.");
      }

      setLoading(false);
    };

    cargarDatos();
  }, [NASA_API_KEY]);

  const irARegistro = () => {
    navigate('/register');
  };

  if (loading) {
    return <div className="home-container"><p>Cargando...</p></div>;
  }

  if (error) {
    return <div className="home-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="home-container">
      <h2 className="home-title">Bienvenido a la Página de Inicio 🚀</h2>
      <h3 className="titulo-cursiva">Imagen Astronómica del Día 🌌</h3>

      {nasaData && (
        <div className="nasa-media">
          {!nasaData.url ? (
            <p>No hay contenido disponible.</p>
          ) : nasaData.media_type === 'video' ? (
            nasaData.url.endsWith('.mp4') ? (
              <video width="800" height="500" controls>
                <source src={nasaData.url} type="video/mp4" />
                Tu navegador no soporta el video.
              </video>
            ) : (
              <div className="video-container">
                <iframe
                  width="800"
                  height="500"
                  src={nasaData.url}
                  title={nasaData.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )
          ) : nasaData.media_type === 'image' ? (
            <img src={nasaData.url || nasaData.hdurl} alt={nasaData.title} className="nasa-img" />
          ) : (
            <p>Tipo de medio no soportado: {nasaData.media_type}</p>
          )}

          <p><strong>{nasaData.title}</strong></p>
          <p className="nasa-explanation">{nasaData.explanation}</p>
        </div>
      )}

      <button className="btn-explore" onClick={irARegistro}>
        Explorar más
      </button>
    </div>
  );
};

 