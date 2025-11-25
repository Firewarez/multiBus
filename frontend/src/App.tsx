import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil"; 
import Compartilhe from "./pages/Compartilhe";
import Suporte from "./pages/Suporte";
import Ajuda from "./pages/Ajuda";
import TermosUso from "./pages/TermosUso";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import RecargaCartao from "./pages/RecargaCartao";
import PontosRecarga from "./pages/PontosRecarga";
import MapaPrevisoes from "./pages/MapaPrevisoes";
import { ThemeProvider } from "./context/ThemeContext";
import { ProfileProvider } from "./context/ProfileContext";
import Login from "./pages/Login";  
import Cadastro from "./pages/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha";
import NotFound from "./pages/NotFound";

// Componente de proteção de rotas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('userToken'); // Ou seu método de autenticação
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <ProfileProvider>
      <ThemeProvider>
        <Routes>
          {/* Rotas públicas de autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          
          {/* Rotas protegidas - principal */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/recarga-cartao" element={
            <ProtectedRoute>
              <RecargaCartao />
            </ProtectedRoute>
          } />
          
          <Route path="/pontos-recarga" element={
            <ProtectedRoute>
              <PontosRecarga />
            </ProtectedRoute>
          } />
          
          <Route path="/mapa-previsoes" element={
            <ProtectedRoute>
              <MapaPrevisoes />
            </ProtectedRoute>
          } />
          
          <Route path="/perfil" element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } />
          
          {/* Rotas públicas de informações */}
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/compartilhe" element={<Compartilhe />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/termos-uso" element={<TermosUso />} />
          
          {/* Redirecionamentos */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </ProfileProvider>
  );
}

export default App;