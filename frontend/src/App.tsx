import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil"; 
import Compartilhe from "./pages/Compartilhe";
import Suporte from "./pages/Suporte";
import Ajuda from "./pages/Ajuda";
import TermosUso from "./pages/TermosUso";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import MapaPrevisoes from "./pages/MapaPrevisoes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} /> 
        <Route path="/compartilhe" element={<Compartilhe />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/termos-uso" element={<TermosUso />} />
        <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="/mapa-previsoes" element={<MapaPrevisoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
