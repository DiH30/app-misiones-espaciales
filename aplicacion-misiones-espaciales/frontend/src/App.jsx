import { BrowserRouter, Routes, Route } from "react-router-dom"
import FormularioMision from './components/FormularioMision';
import ListaMisiones from './components/ListaMisiones';
import { HomePage } from "./pages/HomePage"
import { RegisterPage } from "./pages/RegisterPage"
import { LoginPage } from "./pages/LoginPage"
import { ProfilePage } from "./pages/ProfilePage"
import { ImagesPage } from "./pages/ImagesPage";
import { PrivateRoute } from "./PrivateRoute"
import { AuthProvider } from "./context/AuthContext"
import { Navbar } from "./components/NavBar"


export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/formulario" element={<FormularioMision />} />
          <Route path="/misiones" element={<ListaMisiones />} />
          <Route path="/images" element={<ImagesPage />} />

          {/* Ruta privada */}

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}