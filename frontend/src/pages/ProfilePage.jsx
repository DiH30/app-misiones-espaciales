import { useAuth } from "../context/AuthContext"
import './ProfilePage.css';  // ✅ Importando archivo CSS

export const ProfilePage = () => {

  const { user, logout } = useAuth()

  return (
    <div className="profile-container">
      <div className="profile-title">Perfil</div>
      {user ? (
        <div>
          <div className="profile-card">
            <p className="profile-name">Nombre: {user.username}</p>
            <p className="profile-detail">Email: {user.email}</p>
            <button
              onClick={logout}
              className="profile-detail"
              style={{ color: '#f1c40f', backgroundColor: '#34495e', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
              Cerrar sesión 
              </button>
          </div>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  )
}
