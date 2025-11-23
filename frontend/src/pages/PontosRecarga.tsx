import React, { useEffect, useState } from "react";
import { 
  Star, 
  StarOff, 
  MapPin, 
  Navigation, 
  X, 
  Bus,
  Battery,
  Zap,
  Car,
  ArrowLeft
} from "lucide-react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Fab,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  LinearProgress,
  Container,
  Divider,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Brightness4, Brightness7, Search, MyLocation } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext"; // Ajuste o caminho conforme necessário

export default function PontosRecarga() {
  const [bairroFiltro, setBairroFiltro] = useState("");
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [localizacao, setLocalizacao] = useState<{ lat: number; lng: number } | null>(null);
  const [modalPonto, setModalPonto] = useState<any>(null);
  const [filtroAtivo, setFiltroAtivo] = useState("todos");
  const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(false);
  const navigate = useNavigate();

  // Usando o contexto de tema
  const { darkMode, toggleDarkMode } = useTheme();

  // LISTA DE PONTOS DE RECARGA
  const pontos = [
    { 
      id: "1", 
      nome: "Terminal Integração Sul", 
      bairro: "Valentina", 
      endereco: "Av. Mariangela Lucena Peixoto", 
      lat: -7.20, 
      lng: -34.84,
      tipo: "terminal",
      capacidade: "alta",
      conectores: ["CCS", "Type 2", "CHAdeMO"]
    },
    { 
      id: "2", 
      nome: "Shopping Sul", 
      bairro: "Bancários", 
      endereco: "Rua Comerciante 88", 
      lat: -7.14, 
      lng: -34.84,
      tipo: "shopping",
      capacidade: "media",
      conectores: ["CCS", "Type 2"]
    },
    { 
      id: "3", 
      nome: "Estação Cabo Branco", 
      bairro: "Altiplano", 
      endereco: "Av. Cabo Branco, 200", 
      lat: -7.12, 
      lng: -34.80,
      tipo: "publico",
      capacidade: "alta",
      conectores: ["CCS", "Type 2", "CHAdeMO", "AC"]
    },
    { 
      id: "4", 
      nome: "Terminal Integração Oeste", 
      bairro: "Oitizeiro", 
      endereco: "Rua Oitizeiro, 55", 
      lat: -7.18, 
      lng: -34.87,
      tipo: "terminal",
      capacidade: "media",
      conectores: ["Type 2", "AC"]
    },
    { 
      id: "5", 
      nome: "Praça da Paz", 
      bairro: "Miramar", 
      endereco: "Praça Central", 
      lat: -7.14, 
      lng: -34.82,
      tipo: "publico",
      capacidade: "baixa",
      conectores: ["Type 2"]
    },
    { 
      id: "6", 
      nome: "Liv Mall", 
      bairro: "Brisamar", 
      endereco: "Av. Rui Carneiro, 500", 
      lat: -7.16, 
      lng: -34.84,
      tipo: "shopping",
      capacidade: "alta",
      conectores: ["CCS", "Type 2", "AC"]
    },
    { 
      id: "7", 
      nome: "Mercado Central", 
      bairro: "Centro", 
      endereco: "Rua das Palmeiras, 33", 
      lat: -7.13, 
      lng: -34.83,
      tipo: "comercial",
      capacidade: "media",
      conectores: ["Type 2", "AC"]
    },
    { 
      id: "8", 
      nome: "Bessa Shopping", 
      bairro: "Bessa", 
      endereco: "Av. Oceânica, 901", 
      lat: -7.11, 
      lng: -34.79,
      tipo: "shopping",
      capacidade: "alta",
      conectores: ["CCS", "Type 2", "CHAdeMO"]
    },
    { 
      id: "9", 
      nome: "Integração Varadouro", 
      bairro: "Varadouro", 
      endereco: "Terminal Varadouro", 
      lat: -7.17, 
      lng: -34.86,
      tipo: "terminal",
      capacidade: "media",
      conectores: ["Type 2", "AC"]
    },
    { 
      id: "10", 
      nome: "Posto Bessa", 
      bairro: "Bessa", 
      endereco: "Av. Governador Argemiro, 210", 
      lat: -7.12, 
      lng: -34.80,
      tipo: "posto",
      capacidade: "alta",
      conectores: ["CCS", "Type 2", "CHAdeMO", "AC"]
    },
  ];

  // CAPTURAR LOCALIZAÇÃO DO USUÁRIO
  const obterLocalizacao = () => {
    setCarregandoLocalizacao(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocalizacao({ 
            lat: pos.coords.latitude, 
            lng: pos.coords.longitude 
          });
          setCarregandoLocalizacao(false);
        },
        () => {
          console.log("Usuário não permitiu acesso à localização");
          setCarregandoLocalizacao(false);
        },
        { timeout: 10000 }
      );
    }
  };

  useEffect(() => {
    obterLocalizacao();
  }, []);

  // CALCULAR DISTÂNCIA ENTRE DOIS PONTOS (Haversine)
  const calcularDistancia = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // FAVORITAR / DESFAVORITAR
  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // ABRIR ROTA NO GOOGLE MAPS
  const abrirRota = (lat: number, lng: number) => {
    if (localizacao) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${localizacao.lat},${localizacao.lng}&destination=${lat},${lng}&travelmode=driving`;
      window.open(url, "_blank");
    } else {
      alert("Não foi possível obter sua localização.");
    }
  };

  // Obter ícone por tipo
  const getTipoIcone = (tipo: string) => {
    switch (tipo) {
      case "terminal": return <Bus size={16} />;
      case "shopping": return <Car size={16} />;
      case "posto": return <Zap size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  // Obter cor por capacidade
  const getCapacidadeColor = (capacidade: string) => {
    switch (capacidade) {
      case "alta": return "#10B981";
      case "media": return "#F59E0B";
      case "baixa": return "#EF4444";
      default: return "#6B7280";
    }
  };

  // FILTRAR PONTOS
  const pontosFiltrados = React.useMemo(() => {
    let filtrados = pontos;

    // Filtro por busca
    if (bairroFiltro) {
      filtrados = filtrados.filter((p) => 
        p.bairro.toLowerCase().includes(bairroFiltro.toLowerCase()) ||
        p.nome.toLowerCase().includes(bairroFiltro.toLowerCase()) ||
        p.endereco.toLowerCase().includes(bairroFiltro.toLowerCase())
      );
    }

    // Filtro por tipo
    if (filtroAtivo !== "todos") {
      filtrados = filtrados.filter(p => p.tipo === filtroAtivo);
    }

    // Ordenar: favoritos primeiro, depois por distância
    return filtrados.sort((a, b) => {
      // Favoritos primeiro
      if (favoritos.includes(a.id) && !favoritos.includes(b.id)) return -1;
      if (!favoritos.includes(a.id) && favoritos.includes(b.id)) return 1;
      
      // Depois por distância (se disponível)
      if (localizacao) {
        const distA = calcularDistancia(localizacao.lat, localizacao.lng, a.lat, a.lng);
        const distB = calcularDistancia(localizacao.lat, localizacao.lng, b.lat, b.lng);
        return distA - distB;
      }
      
      return 0;
    });
  }, [pontos, favoritos, bairroFiltro, filtroAtivo, localizacao]);

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

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Battery size={32} className={darkMode ? "text-green-300" : "text-green-600"} />
            </motion.div>
            <div>
              <Typography
                variant="h3"
                className={`font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}
              >
                Pontos de Recarga
              </Typography>
              <Typography
                variant="subtitle1"
                className={darkMode ? "text-slate-300" : "text-slate-600"}
              >
                Encontre estações de recarga próximas a você
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip title="Atualizar localização">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton 
                  onClick={obterLocalizacao}
                  disabled={carregandoLocalizacao}
                  sx={{
                    backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(100, 116, 139, 0.1)",
                    color: darkMode ? "#22c55e" : "#64748b",
                    '&:hover': {
                      backgroundColor: darkMode ? "rgba(34, 197, 94, 0.2)" : "rgba(100, 116, 139, 0.2)",
                    }
                  }}
                >
                  {carregandoLocalizacao ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <MyLocation />
                    </motion.div>
                  ) : (
                    <MyLocation />
                  )}
                </IconButton>
              </motion.div>
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
        </motion.div>

        {/* Filtros e Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Card
            sx={{
              background: darkMode
                ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Buscar por nome, endereço ou bairro..."
                value={bairroFiltro}
                onChange={(e) => setBairroFiltro(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{
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
                  onClick={() => setFiltroAtivo(filtroAtivo === "favoritos" ? "todos" : "favoritos")}
                  sx={{ 
                    bgcolor: filtroAtivo === "favoritos" 
                      ? darkMode ? "rgba(246, 194, 62, 0.2)" : "rgba(246, 194, 62, 0.1)"
                      : 'transparent',
                    color: filtroAtivo === "favoritos" 
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
            </div>

            {/* Filtros por tipo */}
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { key: "todos", label: "Todos", icon: "🔋" },
                { key: "terminal", label: "Terminais", icon: "🚌" },
                { key: "shopping", label: "Shoppings", icon: "🏬" },
                { key: "posto", label: "Postos", icon: "⛽" },
                { key: "publico", label: "Públicos", icon: "🏛️" },
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
          </Card>
        </motion.div>

        {/* Grid de Pontos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {pontosFiltrados.map((ponto, index) => {
                const distancia = localizacao
                  ? calcularDistancia(localizacao.lat, localizacao.lng, ponto.lat, ponto.lng).toFixed(1)
                  : null;
                const isFav = favoritos.includes(ponto.id);

                return (
                  <motion.div
                    key={ponto.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100,
                      delay: index * 0.05
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -4,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                      }
                    }}
                  >
                    <Card
                      className="cursor-pointer relative overflow-hidden"
                      sx={{
                        background: darkMode
                          ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                          : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                        borderRadius: 3,
                        minHeight: 200,
                      }}
                      onClick={() => setModalPonto(ponto)}
                    >
                      <CardContent className="p-4">
                        {/* Header do Card */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getTipoIcone(ponto.tipo)}
                            <Typography 
                              variant="h6" 
                              className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
                            >
                              {ponto.nome}
                            </Typography>
                          </div>
                          
                          <motion.div 
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorito(ponto.id);
                            }}
                          >
                            <IconButton 
                              size="small"
                              sx={{ 
                                color: isFav ? "#F6C23E" : darkMode ? "#94a3b8" : "#D1D5DB",
                              }}
                            >
                              {isFav ? <Star /> : <StarOff />}
                            </IconButton>
                          </motion.div>
                        </div>

                        {/* Informações do Ponto */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className={darkMode ? "text-slate-400" : "text-slate-600"} />
                            <Typography 
                              variant="body2" 
                              className={darkMode ? "text-slate-300" : "text-slate-700"}
                            >
                              {ponto.endereco}
                            </Typography>
                          </div>

                          <div className="flex items-center justify-between">
                            <Chip
                              label={ponto.bairro}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderColor: darkMode ? "#475569" : "#cbd5e1",
                                color: darkMode ? "#e2e8f0" : "#475569",
                              }}
                            />
                            
                            <Chip
                              label={ponto.capacidade.toUpperCase()}
                              size="small"
                              sx={{
                                backgroundColor: getCapacidadeColor(ponto.capacidade) + '20',
                                color: getCapacidadeColor(ponto.capacidade),
                                fontWeight: 'bold',
                              }}
                            />
                          </div>

                          {/* Conectores */}
                          <div className="flex flex-wrap gap-1">
                            {ponto.conectores.map((conector, idx) => (
                              <Chip
                                key={idx}
                                label={conector}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: darkMode ? "#22c55e" : "#10b981",
                                  color: darkMode ? "#22c55e" : "#10b981",
                                  fontSize: '0.6rem',
                                  height: 20,
                                }}
                              />
                            ))}
                          </div>

                          {/* Distância */}
                          {distancia && (
                            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                              <Typography 
                                variant="body2" 
                                className={darkMode ? "text-slate-400" : "text-slate-600"}
                              >
                                Distância
                              </Typography>
                              <Typography 
                                variant="body2" 
                                className="font-bold"
                                sx={{ color: darkMode ? "#22c55e" : "#10b981" }}
                              >
                                {distancia} km
                              </Typography>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Estado vazio */}
          {pontosFiltrados.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Battery size={64} className={`mx-auto mb-4 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
              <Typography 
                variant="h6" 
                className={darkMode ? "text-slate-400" : "text-slate-600"}
              >
                Nenhum ponto de recarga encontrado
              </Typography>
              <Typography 
                variant="body2" 
                className={darkMode ? "text-slate-500" : "text-slate-500"}
              >
                Tente ajustar os filtros de busca
              </Typography>
            </motion.div>
          )}
        </motion.div>

        {/* Modal de Detalhes */}
        <Dialog 
          open={!!modalPonto} 
          onClose={() => setModalPonto(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: darkMode
                ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getTipoIcone(modalPonto?.tipo)}
                <Typography 
                  variant="h5" 
                  className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
                >
                  {modalPonto?.nome}
                </Typography>
              </div>
              <IconButton onClick={() => setModalPonto(null)}>
                <X className={darkMode ? "text-slate-400" : "text-slate-600"} />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              {modalPonto && (
                <div className="space-y-4">
                  {/* Informações Básicas */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className={darkMode ? "text-slate-400" : "text-slate-600"} />
                      <Typography className={darkMode ? "text-slate-300" : "text-slate-700"}>
                        {modalPonto.endereco}
                      </Typography>
                    </div>

                    <div className="flex items-center gap-4">
                      <Chip
                        label={modalPonto.bairro}
                        variant="outlined"
                        sx={{
                          borderColor: darkMode ? "#475569" : "#cbd5e1",
                          color: darkMode ? "#e2e8f0" : "#475569",
                        }}
                      />
                      <Chip
                        label={`Capacidade ${modalPonto.capacidade.toUpperCase()}`}
                        sx={{
                          backgroundColor: getCapacidadeColor(modalPonto.capacidade) + '20',
                          color: getCapacidadeColor(modalPonto.capacidade),
                          fontWeight: 'bold',
                        }}
                      />
                    </div>

                    {/* Distância */}
                    {localizacao && (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-opacity-20"
                        style={{ 
                          backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)' 
                        }}
                      >
                        <Typography className={darkMode ? "text-slate-300" : "text-slate-700"}>
                          Distância atual
                        </Typography>
                        <Typography 
                          className="font-bold"
                          sx={{ color: darkMode ? "#22c55e" : "#10b981" }}
                        >
                          {calcularDistancia(
                            localizacao.lat,
                            localizacao.lng,
                            modalPonto.lat,
                            modalPonto.lng
                          ).toFixed(1)} km
                        </Typography>
                      </div>
                    )}

                    {/* Conectores */}
                    <div>
                      <Typography 
                        variant="h6" 
                        className={`mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                      >
                        Conectores Disponíveis
                      </Typography>
                      <div className="flex flex-wrap gap-2">
                        {modalPonto.conectores.map((conector: string, idx: number) => (
                          <Chip
                            key={idx}
                            label={conector}
                            sx={{
                              backgroundColor: darkMode ? "rgba(34, 197, 94, 0.2)" : "rgba(16, 185, 129, 0.2)",
                              color: darkMode ? "#22c55e" : "#10b981",
                              fontWeight: 'bold',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Botão de Navegação */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Navigation />}
                      onClick={() => abrirRota(modalPonto.lat, modalPonto.lng)}
                      sx={{
                        backgroundColor: darkMode ? "#22c55e" : "#10b981",
                        color: "white",
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: darkMode ? "#16a34a" : "#059669",
                        }
                      }}
                    >
                      Abrir Rota no Maps
                    </Button>
                  </motion.div>
                </div>
              )}
            </DialogContent>
          </motion.div>
        </Dialog>
      </Container>

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
            <ArrowLeft />
          </Fab>
        </Tooltip>
      </motion.div>
    </Box>
  );
}