import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import './HomePage.css';  // Importando el archivo CSS

export const HomePage = () => {
  const [nasaData, setNasaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // ✅ Hook para navegación

  const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const NASA_API_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

  useEffect(() => {
    if (!NASA_API_KEY) {
      setError('Clave de API de la NASA no configurada.');
      setLoading(false);
      return;
    }

    fetch(NASA_API_URL)
      .then(response => response.json())
      .then(data => {
        setNasaData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener los datos de la NASA:', err);
        setError('Error al obtener los datos de la NASA');
        setLoading(false);
      });
  }, [NASA_API_KEY]);

  const irARegistro = () => {
    navigate('/register'); // ✅ Redirige a /register
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-container">
      <h2 className="home-title">Bienvenido a la Página de Inicio 🚀</h2>
      <h3 className="titulo-cursiva">Imagen Astronómica del Día</h3>

      {nasaData && (
        <div className="nasa-image">
          <img src={nasaData.url} alt={nasaData.title} className="nasa-img" />
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