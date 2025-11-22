import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { Star, StarOff, Clock, Navigation, MapPin, Bus } from "lucide-react";
import {
  Card,
  IconButton,
  Snackbar,
  Alert,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Fab,
  Tooltip,
  Badge,
  Zoom,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Brightness4, Brightness7, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getLinhasAPI, getParadasAPI } from "../services/api";


// Ajuste do ícone padrão do Leaflet (evita problema com assets)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface Linha {
  id: string;
  nome: string;
  desc: string;
  lat: number;
  lng: number;
  status: string;
  cor: string;
}

interface Parada {
  id: string;
  nome: string;
  lat: number;
  lng: number;
  linhas: string[];
  movimentacao: string;
}

// Novas linhas atualizadas
const LINHAS_INICIAIS = [
  {
    id: "110",
    nome: "110 – Jardim Planalto",
    desc: "Jardim Planalto ↔ Centro",
    lat: -7.1549,
    lng: -34.8954,
    status: "Em operação",
    cor: "#FF6B35",
  },
  {
    id: "118",
    nome: "118 – Paratibe",
    desc: "Paratibe ↔ Centro",
    lat: -7.1991,
    lng: -34.8488,
    status: "Em operação",
    cor: "#4ECDC4",
  },
  {
    id: "120",
    nome: "120 – Parque do Sol",
    desc: "Parque do Sol ↔ Centro",
    lat: -7.2079,
    lng: -34.8506,
    status: "A caminho",
    cor: "#45B7D1",
  },
  {
    id: "301",
    nome: "301 – Mangabeira / D Pedro II",
    desc: "Mangabeira ↔ D. Pedro II",
    lat: -7.1885,
    lng: -34.8390,
    status: "A caminho",
    cor: "#96CEB4",
  },
  {
    id: "302",
    nome: "302 – Cidade Verde",
    desc: "Cidade Verde ↔ Centro",
    lat: -7.1786,
    lng: -34.8369,
    status: "Em operação",
    cor: "#FECA57",
  },
  {
    id: "303",
    nome: "303 – Cidade Verde / D Pedro II",
    desc: "Cidade Verde ↔ D. Pedro II",
    lat: -7.1446,
    lng: -34.8508,
    status: "Em operação",
    cor: "#FF9FF3",
  },
  {
    id: "510",
    nome: "510 – Tambaú",
    desc: "Tambaú ↔ Centro",
    lat: -7.1194,
    lng: -34.8273,
    status: "A caminho",
    cor: "#54A0FF",
  },
  {
    id: "518",
    nome: "518 – Bancários / Epitácio",
    desc: "Bancários ↔ Epitácio Pessoa",
    lat: -7.1547,
    lng: -34.8386,
    status: "Em operação",
    cor: "#5F27CD",
  },
  {
    id: "1500",
    nome: "1500 – Circular",
    desc: "Circular Centro",
    lat: -7.1721,
    lng: -34.8976,
    status: "Em operação",
    cor: "#00D2D3",
  },
  {
    id: "1519",
    nome: "1519 – Valentina / Cruz das Armas",
    desc: "Valentina ↔ Cruz das Armas",
    lat: -7.1987,
    lng: -34.8418,
    status: "A caminho",
    cor: "#FF9F43",
  },
  {
    id: "2300",
    nome: "2300 – Circular",
    desc: "Circular Zona Norte",
    lat: -7.1684,
    lng: -34.8743,
    status: "Em operação",
    cor: "#9B59B6",
  },
  {
    id: "2515",
    nome: "2515 – Mangabeira / Cristo",
    desc: "Mangabeira ↔ Cristo Redentor",
    lat: -7.1648,
    lng: -34.8619,
    status: "Na garagem",
    cor: "#1ABC9C",
  },
  {
    id: "3200",
    nome: "3200 – Circular",
    desc: "Circular Zona Sul",
    lat: -7.1339,
    lng: -34.8600,
    status: "Em operação",
    cor: "#34495E",
  },
  {
    id: "5120",
    nome: "5120 – Valentina / Epitácio",
    desc: "Valentina ↔ Epitácio Pessoa",
    lat: -7.1329,
    lng: -34.8467,
    status: "A caminho",
    cor: "#E74C3C",
  },
  {
    id: "5210",
    nome: "5210 – Mangabeira / Epitácio",
    desc: "Mangabeira ↔ Epitácio Pessoa",
    lat: -7.1196,
    lng: -34.8590,
    status: "Em operação",
    cor: "#3498DB",
  },
  {
    id: "5100",
    nome: "5100 – Circular",
    desc: "Circular Litorânea",
    lat: -7.1818,
    lng: -34.8598,
    status: "A caminho",
    cor: "#F39C12",
  },
  {
    id: "5600",
    nome: "5600 – Mangabeira / Shopping",
    desc: "Mangabeira ↔ Shopping",
    lat: -7.0975,
    lng: -34.8404,
    status: "Em operação",
    cor: "#27AE60",
  },
  {
    id: "9901",
    nome: "9901 – Shopping / Valentina",
    desc: "Shopping ↔ Valentina",
    lat: -7.1640,
    lng: -34.8264,
    status: "A caminho",
    cor: "#8E44AD",
  }
];

// Paradas de ônibus expandidas
const PARADAS = [
  {
    id: "p1",
    nome: "Terminal Central - Centro",
    lat: -7.1183,
    lng: -34.8799,
    linhas: ["301", "302", "510", "518", "1500"],
    movimentacao: "muito alta"
  },
  {
    id: "p2",
    nome: "Mangabeira",
    lat: -7.1727,
    lng: -34.8400,
    linhas: ["301", "303", "2515", "5210", "5600"],
    movimentacao: "muito alta"
  },
  {
    id: "p3",
    nome: "Av. Epitácio",
    lat: -7.1193,
    lng: -34.8415,
    linhas: ["518", "510", "5120", "5210"],
    movimentacao: "alta"
  },
  {
    id: "p4",
    nome: "Shopping Tambiá",
    lat: -7.1163,
    lng: -34.8799,
    linhas: ["510", "1500", "518"],
    movimentacao: "alta"
  },
  {
    id: "p5",
    nome: "Cruz das Armas",
    lat: -7.1436,
    lng: -34.8910,
    linhas: ["120", "5100", "5120"],
    movimentacao: "media"
  },
  {
    id: "p6",
    nome: "Valentina Figueiredo",
    lat: -7.2063,
    lng: -34.8439,
    linhas: ["1519", "118", "9901", "3200"],
    movimentacao: "media"
  },
  {
    id: "p7",
    nome: "Cidade Verde",
    lat: -7.1794,
    lng: -34.8298,
    linhas: ["302", "303"],
    movimentacao: "alta"
  },
  {
    id: "p8",
    nome: "Jardim Planalto",
    lat: -7.1589,
    lng: -34.8976,
    linhas: ["110"],
    movimentacao: "media"
  },
  {
    id: "p9",
    nome: "Parque do Sol - Jampa Shopping",
    lat: -7.2134,
    lng: -34.8464,
    linhas: ["120"],
    movimentacao: "media"
  },
  {
    id: "p10",
    nome: "Paratibe",
    lat: -7.2068,
    lng: -34.8382,
    linhas: ["118"],
    movimentacao: "baixa"
  },
  {
    id: "p11",
    nome: "Manaíra Shopping",
    lat: -7.0977,
    lng: -34.8446,
    linhas: ["5100", "510", "518"],
    movimentacao: "alta"
  },
  {
    id: "p12",
    nome: "Mangabeira Shopping",
    lat: -7.1631,
    lng: -34.8312,
    linhas: ["5600", "9901", "302"],
    movimentacao: "alta"
  },
  {
    id: "p13",
    nome: "Cristo Redentor",
    lat: -7.1660,
    lng: -34.8720,
    linhas: ["2515", "2300"],
    movimentacao: "media"
  },
  {
    id: "p14",
    nome: "Bessa",
    lat: -7.0757,
    lng: -34.8378,
    linhas: ["510", "5100"],
    movimentacao: "media"
  },
  {
    id: "p15",
    nome: "Alto do Mateus",
    lat: -7.1426,
    lng: -34.9106,
    linhas: ["1500"],
    movimentacao: "media"
  },
  {
    id: "p16",
    nome: "José Américo - Super Fácil",
    lat: -7.1667,
    lng: -34.8602,
    linhas: ["5120"],
    movimentacao: "media"
  },
  {
    id: "p17",
    nome: "Água Fria - Unipê",
    lat: -7.1572,
    lng: -34.8577,
    linhas: ["1519"],
    movimentacao: "media"
  },
  {
    id: "p18",
    nome: "Bancários - Shopping Sul",
    lat: -7.1485,
    lng: -34.8432,
    linhas: ["3200", "5600", "5100"],
    movimentacao: "media"
  },
  {
    id: "p19",
    nome: "Ernesto Geisel - Cidade da Polícia",
    lat: -7.1711,
    lng: -34.8741,
    linhas: ["3200", "120", "118"],
    movimentacao: "media"
  },
  {
    id: "p20",
    nome: "Grotão - Feira",
    lat: -7.1847,
    lng: -34.8830,
    linhas: ["1500"],
    movimentacao: "media"
  }
];

// Interface para os tempos
interface TempoConfig {
  min: number;
  max: number;
}

// Função para simular tempo de chegada
const simularTempoChegada = (linhaId: string): number => {
  const tempos: { [key: string]: TempoConfig } = {
    "110": { min: 8, max: 20 },
    "118": { min: 12, max: 25 },
    "120": { min: 6, max: 18 },
    "301": { min: 5, max: 15 },
    "302": { min: 7, max: 17 },
    "303": { min: 10, max: 22 },
    "510": { min: 3, max: 10 },
    "518": { min: 5, max: 12 },
    "1500": { min: 8, max: 20 },
    "1519": { min: 6, max: 16 },
    "2300": { min: 10, max: 24 },
    "2515": { min: 8, max: 19 },
    "3200": { min: 12, max: 28 },
    "5120": { min: 4, max: 11 },
    "5210": { min: 7, max: 16 },
    "5100": { min: 9, max: 21 },
    "5600": { min: 5, max: 14 },
    "9901": { min: 6, max: 15 }
  };

  const config = tempos[linhaId] || { min: 5, max: 15 };
  return Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
};

// Criar ícone personalizado para paradas
const criarIconeParada = (movimentacao: string) => {
  const cores: { [key: string]: string } = {
    "muito alta": "#E74C3C",
    "alta": "#E67E22",
    "media": "#F1C40F",
    "baixa": "#2ECC71"
  };

  return new L.DivIcon({
    html: `
      <div style="
        background-color: ${cores[movimentacao] || "#4A90E2"}; 
        width: 24px; 
        height: 24px; 
        border-radius: 50%; 
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 10px;
        transition: all 0.3s ease;
        cursor: pointer;
      " class="parada-icon">P</div>
    `,
    className: 'parada-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Criar ícone personalizado para linhas
const criarIconeLinha = (cor: string) => {
  return new L.DivIcon({
    html: `
      <div style="
        background-color: ${cor};
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 11px;
        transition: all 0.3s ease;
        cursor: pointer;
      " class="linha-icon">🚌</div>
      <style>
        .linha-icon:hover {
          transform: scale(1.15);
        }
        .parada-icon:hover {
          transform: scale(1.1);
        }
      </style>
    `,
    className: 'linha-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

// Interface para parada
interface Parada {
  id: string;
  nome: string;
  lat: number;
  lng: number;
  linhas: string[];
  movimentacao: string;
}

export default function LinhasFavoritas() {
  // estado local
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [paradas, setParadas] = useState<Parada[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [busca, setBusca] = useState("");
  const [posicaoUser, setPosicaoUser] = useState<[number, number] | null>(null);
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    severity: "success" as "success" | "info" | "warning"
  });
  const [paradaSelecionada, setParadaSelecionada] = useState<Parada | null>(null);
  const [temposChegada, setTemposChegada] = useState<{ [key: string]: number }>({});
  const [carregandoTempos, setCarregandoTempos] = useState(false);
  const [mapaInstancia, setMapaInstancia] = useState<any>(null);
  const [filtroAtivo, setFiltroAtivo] = useState<string>("todos");
  const [mostrarApenasFavoritos, setMostrarApenasFavoritos] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // carregar favoritos do localStorage (se houver)
  useEffect(() => {
    const raw = localStorage.getItem("linhasFavoritas");
    if (raw) {
      try {
        const arr = JSON.parse(raw) as string[];
        setFavoritos(arr);
      } catch {
        setFavoritos([]);
      }
    }
  }, []);

  // salvar favoritos sempre que mudar
  useEffect(() => {
    localStorage.setItem("linhasFavoritas", JSON.stringify(favoritos));
  }, [favoritos]);

  // tentar pegar localização do usuário (para centralizar mapa)
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosicaoUser([pos.coords.latitude, pos.coords.longitude]),
      () => {
        /* permissao negada - não crítico */
      },
      { timeout: 5000 }
    );
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Busca linhas e paradas ao mesmo tempo
        const [linhasData, paradasData] = await Promise.all([
          getLinhasAPI(),
          getParadasAPI()
        ]);

        console.log("Dados recebidos do backend:", { linhasData, paradasData });

        // ADAPTADOR: Transforma os dados do banco (inglês) para o formato do front (português)
        const linhasFormatadas = linhasData.map((l: any) => ({
          id: String(l.id), // Garante que ID seja string
          nome: l.name,
          desc: l.description || `${l.name} ↔ Centro`, // Fallback se não tiver descrição
          lat: Number(l.latitude || -7.1194), // Fallback se vier null
          lng: Number(l.longitude || -34.8273),
          status: l.status || "Em operação",
          cor: l.color || "#333",
        }));

        const paradasFormatadas = paradasData.map((p: any) => ({
          id: String(p.id),
          nome: p.name,
          lat: Number(p.latitude),
          lng: Number(p.longitude),
          linhas: [], // Implementaremos a relação depois
          movimentacao: "media" // Valor padrão
        }));

        setLinhas(linhasFormatadas);
        setParadas(paradasFormatadas);
      } catch (error) {
        console.error("Erro ao conectar com a API:", error);
        setSnack({
          open: true,
          msg: "Erro ao carregar dados do servidor. Verifique se o backend está rodando.",
          severity: "warning"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // Array vazio = roda apenas uma vez ao iniciar

  // toggle favorito (pela lista ou popup do mapa)
  const toggleFavorito = (id: string, nome?: string) => {
    setFavoritos((prev) => {
      const novo = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
      setSnack({
        open: true,
        msg: prev.includes(id) ? `${nome ?? id} removida dos favoritos` : `${nome ?? id} adicionada aos favoritos`,
        severity: prev.includes(id) ? "info" : "success",
      });
      return novo;
    });
  };

  // Centralizar no usuário
  const centralizarNoUsuario = () => {
    if (posicaoUser && mapaInstancia) {
      mapaInstancia.flyTo(posicaoUser, 15, {
        duration: 1.5
      });
    }
  };

  // Filtrar linhas
  const linhasFiltradas = React.useMemo(() => {
    let filtradas = linhas;

    // Filtro por busca
    if (busca) {
      filtradas = filtradas.filter(l =>
        l.nome.toLowerCase().includes(busca.toLowerCase()) ||
        l.id.includes(busca)
      );
    }

    // Filtro por status
    if (filtroAtivo !== "todos") {
      filtradas = filtradas.filter(l => {
        if (filtroAtivo === "operacao") return l.status === "Em operação";
        if (filtroAtivo === "caminho") return l.status === "A caminho";
        if (filtroAtivo === "garagem") return l.status === "Na garagem";
        return true;
      });
    }

    // Filtro por favoritos
    if (mostrarApenasFavoritos) {
      filtradas = filtradas.filter(l => favoritos.includes(l.id));
    }

    // Ordenar: favoritos primeiro
    const favSet = new Set(favoritos);
    const favsInOrder = favoritos
      .map(id => filtradas.find(l => l.id === id))
      .filter(Boolean) as typeof LINHAS_INICIAIS;
    const restantes = filtradas.filter(l => !favSet.has(l.id));

    return [...favsInOrder, ...restantes];
  }, [linhas, favoritos, busca, filtroAtivo, mostrarApenasFavoritos]);

  // Função para lidar com clique na parada
  const handleClickParada = (parada: Parada) => {
    setParadaSelecionada(parada);
    setCarregandoTempos(true);

    setTimeout(() => {
      const novosTempos: { [key: string]: number } = {};
      parada.linhas.forEach((linhaId: string) => {
        novosTempos[linhaId] = simularTempoChegada(linhaId);
      });
      setTemposChegada(novosTempos);
      setCarregandoTempos(false);
    }, 1000);
  };

  // Função para fechar o modal
  const handleFecharModal = () => {
    setParadaSelecionada(null);
    setTemposChegada({});
  };

  // Obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "A caminho": return "#10B981";
      case "Em operação": return "#3B82F6";
      case "Na garagem": return "#6B7280";
      default: return "#6B7280";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
        color: darkMode ? "#f1f5f9" : "#1e293b",
        transition: "all 0.4s ease-in-out",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorativo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40vh",
          background: darkMode
            ? "linear-gradient(135deg, #059669 0%, #0ea5e9 100%)"
            : "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Box className="max-w-7xl mx-auto p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="rounded-2xl shadow-lg p-6 mb-6"
            sx={{
              backgroundColor: darkMode ? "#1e293b" : "#ffffff",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
            }}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Bus size={32} className={darkMode ? "text-green-300" : "text-green-600"} />
                </motion.div>
                <div>
                  <Typography
                    variant="h4"
                    className={`font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}
                  >
                    Mapa de Previsões
                  </Typography>
                  <Typography
                    variant="body2"
                    className={darkMode ? "text-slate-300" : "text-slate-600"}
                  >
                    {linhas.length} linhas disponíveis • {paradas.length} paradas
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Buscar linha ou ID..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    minWidth: 250,
                    backgroundColor: darkMode ? "#334155" : "white",
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: darkMode ? '#475569' : '#cbd5e1',
                      },
                      '&:hover fieldset': {
                        borderColor: darkMode ? '#22c55e' : '#10b981',
                      },
                    }
                  }}
                />

                <Tooltip title="Mostrar apenas favoritos">
                  <IconButton
                    onClick={() => setMostrarApenasFavoritos(!mostrarApenasFavoritos)}
                    sx={{
                      bgcolor: mostrarApenasFavoritos
                        ? darkMode ? "rgba(246, 194, 62, 0.2)" : "rgba(246, 194, 62, 0.1)"
                        : 'transparent',
                      color: mostrarApenasFavoritos
                        ? '#F6C23E'
                        : darkMode ? '#e2e8f0' : 'inherit'
                    }}
                  >
                    <Badge
                      badgeContent={favoritos.length}
                      color="primary"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: darkMode ? '#22c55e' : '#10b981',
                        }
                      }}
                    >
                      <Star />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title={darkMode ? "Modo claro" : "Modo escuro"}>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      onClick={toggleDarkMode}
                      sx={{
                        backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(100, 116, 139, 0.1)",
                        color: darkMode ? "#22c55e" : "#64748b",
                        '&:hover': {
                          backgroundColor: darkMode ? "rgba(34, 197, 94, 0.2)" : "rgba(100, 116, 139, 0.2)",
                        }
                      }}
                    >
                      {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                  </motion.div>
                </Tooltip>
              </div>
            </div>

            {/* Filtros */}
            <motion.div
              className="flex flex-wrap gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[
                { key: "todos", label: "Todos", icon: "🚌" },
                { key: "operacao", label: "Em Operação", icon: "🟢" },
                { key: "caminho", label: "A Caminho", icon: "🟡" },
                { key: "garagem", label: "Na Garagem", icon: "⚫" }
              ].map((filtro) => (
                <motion.div
                  key={filtro.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Chip
                    icon={<span>{filtro.icon}</span>}
                    label={filtro.label}
                    onClick={() => setFiltroAtivo(filtro.key)}
                    color={filtroAtivo === filtro.key ? "primary" : "default"}
                    variant={filtroAtivo === filtro.key ? "filled" : "outlined"}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: filtroAtivo === filtro.key
                        ? darkMode ? "rgba(34, 197, 94, 0.2)" : undefined
                        : darkMode ? "rgba(255,255,255,0.1)" : undefined,
                      color: darkMode ? "#e2e8f0" : undefined,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mapa */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="rounded-2xl shadow-lg overflow-hidden h-[500px] relative"
                sx={{
                  backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                }}
              >
                <MapContainer
                  center={posicaoUser || [-7.12, -34.86]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  whenCreated={setMapaInstancia}
                >
                  <TileLayer
                    url={darkMode
                      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                  />

                  {/* Marcadores das linhas */}
                  {linhas.map((l) => (
                    <Marker
                      key={l.id}
                      position={[l.lat, l.lng]}
                      icon={criarIconeLinha(l.cor)}
                    >
                      <Popup>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          style={{
                            minWidth: 220,
                            backgroundColor: darkMode ? "#1e293b" : "white",
                            color: darkMode ? "#e2e8f0" : "#1e293b",
                            padding: '8px',
                            borderRadius: '8px'
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: l.cor }}
                            />
                            <strong>{l.nome}</strong>
                          </div>
                          <p style={{ margin: "6px 0 8px 0", fontSize: 13 }}>{l.desc}</p>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleFavorito(l.id, l.nome)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "8px 12px",
                                borderRadius: 8,
                                border: "none",
                                cursor: "pointer",
                                background: favoritos.includes(l.id) ? "#f6c23e" : "#e6e6e6",
                                flex: 1,
                                justifyContent: "center",
                                color: favoritos.includes(l.id) ? "#000" : "#666"
                              }}
                            >
                              {favoritos.includes(l.id) ? <Star size={16} /> : <StarOff size={16} />}
                              <span style={{ fontSize: 13 }}>
                                {favoritos.includes(l.id) ? "Remover" : "Favoritar"}
                              </span>
                            </motion.button>
                          </div>
                        </motion.div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* Marcadores das paradas */}
                  {paradas.map((parada) => (
                    <Marker
                      key={parada.id}
                      position={[parada.lat, parada.lng]}
                      icon={criarIconeParada(parada.movimentacao)}
                      eventHandlers={{
                        click: () => handleClickParada(parada),
                      }}
                    >
                      <Popup>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          style={{
                            minWidth: 240,
                            backgroundColor: darkMode ? "#1e293b" : "white",
                            color: darkMode ? "#e2e8f0" : "#1e293b",
                            padding: '8px',
                            borderRadius: '8px'
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin size={16} className="text-blue-500" />
                            <strong className="text-sm">{parada.nome}</strong>
                          </div>
                          <div className="mb-3">
                            <Typography variant="body2" className={darkMode ? "text-slate-300" : "text-gray-600"}>
                              {parada.linhas.length} linhas passam aqui
                            </Typography>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {parada.linhas.slice(0, 4).map((linhaId: string) => {
                                const linha = linhas.find(l => l.id === linhaId);
                                return linha ? (
                                  <Chip
                                    key={linhaId}
                                    label={linhaId}
                                    size="small"
                                    style={{
                                      backgroundColor: linha.cor,
                                      color: "white",
                                      fontWeight: "bold"
                                    }}
                                  />
                                ) : null;
                              })}
                              {parada.linhas.length > 4 && (
                                <Chip
                                  label={`+${parada.linhas.length - 4}`}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleClickParada(parada)}
                            style={{
                              width: '100%',
                              padding: '10px 16px',
                              backgroundColor: '#4A90E2',
                              color: 'white',
                              border: 'none',
                              borderRadius: 8,
                              cursor: 'pointer',
                              fontSize: 14,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 8
                            }}
                          >
                            <Clock size={16} />
                            Ver tempos de chegada
                          </motion.button>
                        </motion.div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* marcador do usuário */}
                  {posicaoUser && (
                    <Marker
                      position={posicaoUser}
                      icon={
                        new L.Icon({
                          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
                          iconSize: [26, 41],
                        })
                      }
                    />
                  )}
                </MapContainer>

                {/* Botão de localização */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-4 right-4"
                >
                  <Tooltip title="Centralizar na minha localização">
                    <Fab
                      size="medium"
                      onClick={centralizarNoUsuario}
                      sx={{
                        bgcolor: darkMode ? '#22c55e' : '#10B981',
                        color: 'white',
                        '&:hover': {
                          bgcolor: darkMode ? '#16a34a' : '#059669'
                        }
                      }}
                    >
                      <MyLocationIcon />
                    </Fab>
                  </Tooltip>
                </motion.div>
              </div>
            </motion.div>

            {/* Lista de Linhas */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div
                className="rounded-2xl shadow-lg p-6 h-[500px] overflow-hidden"
                sx={{
                  backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                }}
              >
                <Typography
                  variant="h6"
                  className="font-bold mb-4 flex items-center gap-2"
                  sx={{ color: darkMode ? "#e2e8f0" : "#1e293b" }}
                >
                  <DirectionsBusIcon sx={{ color: darkMode ? "#22c55e" : "#2F855A" }} />
                  {mostrarApenasFavoritos ? "Linhas Favoritas" : "Todas as Linhas"}
                  <Badge
                    badgeContent={linhasFiltradas.length}
                    color="primary"
                    sx={{
                      ml: 1,
                      '& .MuiBadge-badge': {
                        backgroundColor: darkMode ? '#22c55e' : '#10b981',
                      }
                    }}
                  />
                </Typography>

                <div className="h-[440px] overflow-y-auto pr-2">
                  <motion.div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {linhasFiltradas.map((l, index) => {
                        const isFav = favoritos.includes(l.id);
                        return (
                          <motion.div
                            layout
                            key={l.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{
                              opacity: 0,
                              scale: 0.8,
                              transition: { duration: 0.2 }
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 100,
                              delay: index * 0.05
                            }}
                            whileHover={{
                              scale: 1.02,
                              y: -2,
                              transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 17
                              }
                            }}
                          >
                            <Card
                              className="p-4 relative transition-all duration-300 border-l-4"
                              sx={{
                                backgroundColor: darkMode ? "#334155" : "white",
                                borderLeftColor: l.cor,
                                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                              }}
                            >
                              <div className="absolute top-3 right-3">
                                <motion.div
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.8 }}
                                  onClick={() => toggleFavorito(l.id, l.nome)}
                                >
                                  <IconButton
                                    size="small"
                                    sx={{
                                      color: isFav ? "#F6C23E" : darkMode ? "#94a3b8" : "#D1D5DB",
                                      '&:hover': {
                                        color: isFav ? "#F59E0B" : darkMode ? "#cbd5e1" : "#9CA3AF"
                                      }
                                    }}
                                  >
                                    {isFav ? <Star /> : <StarOff />}
                                  </IconButton>
                                </motion.div>
                              </div>

                              <div className="flex items-start gap-3 mb-2">
                                <div
                                  className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                                  style={{ backgroundColor: l.cor }}
                                />
                                <div className="flex-1 min-w-0">
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      fontWeight: 600,
                                      color: l.cor
                                    }}
                                    className="truncate"
                                  >
                                    {l.nome}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: darkMode ? "#94a3b8" : "text.secondary"
                                    }}
                                    className="line-clamp-2"
                                  >
                                    {l.desc}
                                  </Typography>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-3">
                                <Chip
                                  label={l.status}
                                  size="small"
                                  sx={{
                                    bgcolor: getStatusColor(l.status) + (darkMode ? '30' : '20'),
                                    color: getStatusColor(l.status),
                                    fontWeight: 'medium',
                                    fontSize: '0.7rem'
                                  }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: darkMode ? "#94a3b8" : "text.secondary"
                                  }}
                                  className="font-mono"
                                >
                                  ID: {l.id}
                                </Typography>
                              </div>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {linhasFiltradas.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <DirectionsBusIcon
                          sx={{
                            fontSize: 48,
                            color: darkMode ? '#475569' : '#9CA3AF',
                            mb: 2
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            color: darkMode ? "#94a3b8" : "text.secondary"
                          }}
                        >
                          Nenhuma linha encontrada
                        </Typography>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Modal de detalhes da parada */}
          <Dialog
            open={!!paradaSelecionada}
            onClose={handleFecharModal}
            maxWidth="sm"
            fullWidth
            TransitionComponent={Zoom}
            PaperProps={{
              sx: {
                backgroundColor: darkMode ? "#1e293b" : "white",
                backgroundImage: 'none'
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <DialogTitle
                className="flex items-center gap-2"
                sx={{
                  color: darkMode ? "#e2e8f0" : "#1e293b",
                  backgroundColor: darkMode ? "#1e293b" : "white",
                }}
              >
                <MapPin className="text-blue-500" />
                {paradaSelecionada?.nome}
              </DialogTitle>
              <DialogContent
                sx={{
                  backgroundColor: darkMode ? "#1e293b" : "white",
                  color: darkMode ? "#e2e8f0" : "#1e293b",
                }}
              >
                {carregandoTempos ? (
                  <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <CircularProgress />
                    </motion.div>
                    <Typography
                      variant="body2"
                      style={{ marginLeft: 12 }}
                      sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                    >
                      Carregando tempos de chegada...
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography
                      variant="body1"
                      gutterBottom
                      className="font-semibold"
                      sx={{ color: darkMode ? "#e2e8f0" : "#1e293b" }}
                    >
                      Próximas chegadas:
                    </Typography>
                    <List>
                      {paradaSelecionada?.linhas.slice(0, 4).map((linhaId: string, index: number) => {
                        const linha = linhas.find(l => l.id === linhaId);
                        const tempo = temposChegada[linhaId];

                        if (!linha) return null;

                        return (
                          <motion.div
                            key={linhaId}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <ListItem
                              divider
                              sx={{
                                py: 2,
                                '&:hover': {
                                  bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                                  borderRadius: 1
                                }
                              }}
                            >
                              <ListItemIcon>
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: linha.cor }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="subtitle2"
                                    className="font-semibold"
                                    sx={{ color: darkMode ? "#e2e8f0" : "#1e293b" }}
                                  >
                                    {linha.nome}
                                  </Typography>
                                }
                                secondary={
                                  <Typography
                                    variant="body2"
                                    sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                                  >
                                    {linha.desc}
                                  </Typography>
                                }
                              />
                              <Box display="flex" alignItems="center" gap={1}>
                                <Clock size={16} className={darkMode ? "text-slate-400" : "text-gray-500"} />
                                <Typography
                                  variant="h6"
                                  style={{
                                    fontWeight: 'bold',
                                    color: tempo <= 5 ? '#E53E3E' : tempo <= 10 ? '#D69E2E' : '#38A169',
                                    minWidth: '60px'
                                  }}
                                >
                                  {tempo} min
                                </Typography>
                              </Box>
                            </ListItem>
                          </motion.div>
                        );
                      })}
                    </List>
                    {paradaSelecionada && paradaSelecionada.linhas.length > 4 && (
                      <Typography
                        variant="caption"
                        className="text-center block mt-2"
                        sx={{ color: darkMode ? "#94a3b8" : "text.secondary" }}
                      >
                        + {paradaSelecionada.linhas.length - 4} outras linhas passam por aqui
                      </Typography>
                    )}
                  </>
                )}
              </DialogContent>
            </motion.div>
          </Dialog>

          {/* Snackbar */}
          <Snackbar
            open={snack.open}
            autoHideDuration={2200}
            onClose={() => setSnack((s) => ({ ...s, open: false }))}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            TransitionComponent={Zoom}
          >
            <Alert
              severity={snack.severity}
              sx={{
                width: "100%",
                backgroundColor: darkMode ? '#1e293b' : undefined,
                color: darkMode ? '#e2e8f0' : undefined,
              }}
              variant="filled"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {snack.msg}
              </motion.div>
            </Alert>
          </Snackbar>
        </motion.div>
      </Box>

      {/* FAB para voltar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Tooltip title="Voltar">
          <Fab
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: darkMode ? "#22c55e" : "#10b981",
              color: "white",
              '&:hover': {
                backgroundColor: darkMode ? "#16a34a" : "#059669",
              }
            }}
          >
            <ArrowBack />
          </Fab>
        </Tooltip>
      </motion.div>
    </Box>
  );
}