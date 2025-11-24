import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <ProfileProvider>
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} /> 
        <Route path="/compartilhe" element={<Compartilhe />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/termos-uso" element={<TermosUso />} />
        <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="/recarga-cartao" element={<RecargaCartao />} />
        <Route path="/pontos-recarga" element={<PontosRecarga />} />
        <Route path="/mapa-previsoes" element={<MapaPrevisoes />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </ProfileProvider>
  );
}

export default App;
