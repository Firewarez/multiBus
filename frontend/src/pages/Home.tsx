import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Avatar,
  Container,
  Chip,
  Fab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Search,
  Share,
  SupportAgent,
  HelpOutline,
  Gavel,
  LocationOn,
  InfoOutlined,
  Notifications,
  Schedule,
  Warning,
  Info,
  Person,
  Email,
  Phone,
  Menu as MenuIcon,
  Close as CloseIcon,
  Map,
  CreditCard,
  Policy,
  Edit,
  EvStation,
  Star,
  Home as HomeIcon,
  ArrowBack,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // ← 1. ADICIONE ESTE IMPORT

export default function Home() {
  const { darkMode, toggleDarkMode } = useTheme(); // ← 2. SUBSTITUA ESTA LINHA
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const drawerWidth = 280;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const drawerContent = (
    <div className={`flex flex-col justify-between h-full p-4 rounded-r-[25px] transition-all duration-300 ${
      darkMode 
        ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" 
        : "bg-gradient-to-b from-[#10b981] via-[#059669] to-[#047857]"
    }`}>
      <div>
        <div className="text-center mb-8">
          <Typography 
            variant="h5" 
            className={`font-bold ${darkMode ? "text-green-400" : "text-white"}`}
          >
            MultiBus
          </Typography>
          <Typography 
            variant="caption" 
            className={darkMode ? "text-gray-400" : "text-green-100"}
          >
            Transporte Inteligente
          </Typography>
        </div>

        <List>
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/"
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.15)',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.25)',
                }
              }}
            >
              <ListItemIcon>
                <HomeIcon className={darkMode ? "text-green-400" : "text-white"} />
              </ListItemIcon>
              <ListItemText 
                primary="Início" 
                primaryTypographyProps={{
                  className: darkMode ? "text-green-400" : "text-white",
                  fontWeight: 'bold'
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/recarga-cartao"
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: 'rgba(255,255,255,0.05)',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.15)',
                }
              }}
            >
              <ListItemIcon>
                <CreditCard className={darkMode ? "text-gray-300" : "text-white"} />
              </ListItemIcon>
              <ListItemText 
                primary="Recarregar Cartões" 
                primaryTypographyProps={{
                  className: darkMode ? "text-gray-300" : "text-white",
                  fontWeight: 'medium'
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/pontos-recarga"
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: 'rgba(255,255,255,0.05)',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.15)',
                }
              }}
            >
              <ListItemIcon>
                <EvStation className={darkMode ? "text-gray-300" : "text-white"} />
              </ListItemIcon>
              <ListItemText 
                primary="Pontos de Recarga" 
                primaryTypographyProps={{
                  className: darkMode ? "text-gray-300" : "text-white",
                  fontWeight: 'medium'
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/mapa-previsoes"
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: 'rgba(255,255,255,0.05)',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.15)',
                }
              }}
            >
              <ListItemIcon>
                <Map className={darkMode ? "text-gray-300" : "text-white"} />
              </ListItemIcon>
              <ListItemText 
                primary="Mapa de Previsões" 
                primaryTypographyProps={{
                  className: darkMode ? "text-gray-300" : "text-white",
                  fontWeight: 'medium'
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/perfil"
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: 'rgba(255,255,255,0.05)',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.15)',
                }
              }}
            >
              <ListItemIcon>
                <Edit className={darkMode ? "text-gray-300" : "text-white"} />
              </ListItemIcon>
              <ListItemText 
                primary="Editar Perfil" 
                primaryTypographyProps={{
                  className: darkMode ? "text-gray-300" : "text-white",
                  fontWeight: 'medium'
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/politica-privacidade"
              sx={{
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.05)',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.15)',
                }
              }}
            >
              <ListItemIcon>
                <Policy className={darkMode ? "text-gray-300" : "text-white"} />
              </ListItemIcon>
              <ListItemText 
                primary="Privacidade" 
                primaryTypographyProps={{
                  className: darkMode ? "text-gray-300" : "text-white",
                  fontWeight: 'medium'
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </div>

      {/* Footer da sidebar com informações adicionais */}
      <div className="mt-8">
        <Divider sx={{ 
          borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
          mb: 2 
        }} />
        <Typography 
          variant="caption" 
          className={darkMode ? "text-gray-400" : "text-green-100"}
          sx={{ display: 'block', textAlign: 'center' }}
        >
          v2.1.0 • MultiBus
        </Typography>
      </div>
    </div>
  );

  const quickActions = [
    { 
      label: "Compartilhe", 
      icon: <Share fontSize="medium" />, 
      path: "/compartilhe",
    },
    { 
      label: "Suporte", 
      icon: <SupportAgent fontSize="medium" />, 
      path: "/suporte",
    },
    { 
      label: "Ajuda", 
      icon: <HelpOutline fontSize="medium" />, 
      path: "/ajuda",
    },
    { 
      label: "Termos de Uso", 
      icon: <Gavel fontSize="medium" />, 
      path: "/termos-uso",
    },
  ];

  const notifications = [
    {
      linha: "Linha 301",
      msg: "Atraso de 10 minutos devido ao trânsito intenso.",
      tipo: "alerta",
      tempo: "Há 5 min"
    },
    {
      linha: "Linha 510",
      msg: "Rota alterada temporariamente devido a obras.",
      tipo: "info",
      tempo: "Há 15 min"
    },
    {
      linha: "Linha 118",
      msg: "Operação normalizada após problemas técnicos.",
      tipo: "normal",
      tempo: "Há 1 hora"
    }
  ];

  const getNotificationStyle = (tipo: string) => {
    switch (tipo) {
      case "alerta":
        return {
          icon: <Schedule sx={{ color: "#f59e0b" }} />,
          badge: "Atraso",
          badgeColor: "bg-yellow-500",
          box: "border-yellow-500/30",
          gradient: "from-yellow-500/10 to-yellow-500/5"
        };
      case "grave":
        return {
          icon: <Warning sx={{ color: "#ef4444" }} />,
          badge: "Importante",
          badgeColor: "bg-red-500",
          box: "border-red-500/30",
          gradient: "from-red-500/10 to-red-500/5"
        };
      case "info":
        return {
          icon: <Info sx={{ color: "#3b82f6" }} />,
          badge: "Informação",
          badgeColor: "bg-blue-500",
          box: "border-blue-500/30",
          gradient: "from-blue-500/10 to-blue-500/5"
        };
      default:
        return {
          icon: <Info sx={{ color: "#10b981" }} />,
          badge: "Aviso",
          badgeColor: "bg-green-500",
          box: "border-green-500/30",
          gradient: "from-green-500/10 to-green-500/5"
        };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
        color: darkMode ? "#f1f5f9" : "#1e293b",
        transition: "all 0.4s ease-in-out",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Drawer Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: 'none',
            background: 'transparent',
            boxShadow: darkMode ? '0 0 20px rgba(0,0,0,0.3)' : '0 0 20px rgba(0,0,0,0.1)',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Drawer Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: 'none',
            boxShadow: darkMode ? '0 0 20px rgba(0,0,0,0.3)' : '0 0 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          ml: { md: `${drawerWidth}px` },
          transition: "all 0.3s ease",
        }}
      >
        {/* Background decorativo */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: { md: drawerWidth },
            right: 0,
            height: "40vh",
            background: darkMode 
              ? "linear-gradient(135deg, #059669 0%, #0ea5e9 100%)"
              : "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
            opacity: 0.1,
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: 4 }}>
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-8"
          >
            <div className="flex items-center gap-3">
              <IconButton
                color="inherit"
                onClick={toggleDrawer}
                className="md:hidden"
                sx={{
                  backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                  color: darkMode ? "#22c55e" : "#10b981",
                  '&:hover': {
                    backgroundColor: darkMode ? "rgba(34, 197, 94, 0.2)" : "rgba(16, 185, 129, 0.2)",
                  }
                }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <LocationOn sx={{ fontSize: 32, color: darkMode ? "#22c55e" : "#10b981" }} />
                </motion.div>
                <div>
                  <Typography
                    variant="h3"
                    className={`font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}
                  >
                    MultiBus
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={darkMode ? "text-slate-300" : "text-slate-600"}
                  >
                    Seu transporte inteligente
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card
                  sx={{
                    background: darkMode 
                      ? "rgba(255, 255, 255, 0.05)" 
                      : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                  }}
                >
                  <Typography 
                    variant="body1" 
                    className={darkMode ? "text-slate-200" : "text-slate-700"}
                  >
                    {currentTime}
                  </Typography>
                </Card>
              </motion.div>

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

          {/* Campo de busca */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <TextField
              fullWidth
              placeholder="Pesquisar linha, destino ou ponto de ônibus..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Search sx={{ color: darkMode ? "#94a3b8" : "#64748b", mr: 1 }} />
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                  fontSize: '1.1rem',
                  padding: '12px 16px',
                  '&:hover': {
                    borderColor: darkMode ? "#22c55e" : "#10b981",
                  },
                  '&.Mui-focused': {
                    borderColor: darkMode ? "#22c55e" : "#10b981",
                    boxShadow: `0 0 0 3px ${darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)'}`,
                  }
                }
              }}
            />
          </motion.div>

          {/* Grid principal - Cards com mesma altura */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Coluna do perfil - Agora com mesma altura */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card
                className="shadow-2xl rounded-2xl overflow-hidden h-full"
                sx={{
                  background: darkMode
                    ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <CardContent className="p-6 text-center flex flex-col flex-1">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mb-4"
                  >
                    <Avatar
                      src="https://i.imgur.com/4YQZ4ZC.png"
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "20px",
                        margin: "0 auto",
                        border: `3px solid ${darkMode ? "#22c55e" : "#10b981"}`,
                      }}
                    />
                  </motion.div>

                  <Typography 
                    variant="h5" 
                    className={`font-bold mb-2 ${darkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    Arthur Barcelos
                  </Typography>

                  <Chip
                    icon={<Person sx={{ fontSize: 16 }} />}
                    label="Usuário Premium"
                    color="success"
                    variant="outlined"
                    size="small"
                    sx={{ mb: 3 }}
                  />

                  <div className="space-y-3 text-left mb-6 flex-1">
                    <div className="flex items-center gap-3">
                      <Email sx={{ fontSize: 20, color: darkMode ? "#94a3b8" : "#64748b" }} />
                      <div>
                        <Typography variant="caption" className={darkMode ? "text-slate-400" : "text-slate-600"}>
                          E-mail
                        </Typography>
                        <Typography variant="body2" className={darkMode ? "text-slate-200" : "text-slate-800"}>
                          arthurbarcelos04@gmail.com
                        </Typography>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone sx={{ fontSize: 20, color: darkMode ? "#94a3b8" : "#64748b" }} />
                      <div>
                        <Typography variant="caption" className={darkMode ? "text-slate-400" : "text-slate-600"}>
                          Telefone
                        </Typography>
                        <Typography variant="body2" className={darkMode ? "text-slate-200" : "text-slate-800"}>
                          (83) 98856-9012
                        </Typography>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <LocationOn sx={{ fontSize: 20, color: darkMode ? "#94a3b8" : "#64748b" }} />
                      <div>
                        <Typography variant="caption" className={darkMode ? "text-slate-400" : "text-slate-600"}>
                          Localização
                        </Typography>
                        <Typography variant="body2" className={darkMode ? "text-slate-200" : "text-slate-800"}>
                          João Pessoa, PB
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate("/perfil")}
                      sx={{
                        color: darkMode ? "#e2e8f0" : "#475569",
                        borderColor: darkMode ? "#475569" : "#cbd5e1",
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: darkMode ? "#22c55e" : "#10b981",
                          backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                        }
                      }}
                    >
                      Editar Perfil
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Coluna de notificações */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card
                className="shadow-2xl rounded-2xl overflow-hidden h-full"
                sx={{
                  background: darkMode
                    ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <Typography
                      variant="h4"
                      className={`font-bold flex items-center gap-3 ${darkMode ? "text-green-400" : "text-green-700"}`}
                    >
                      <Notifications sx={{ fontSize: 32 }} />
                      Notificações
                    </Typography>
                    
                    <Chip 
                      label={`${notifications.length} alertas`} 
                      color="primary" 
                      variant="outlined" 
                    />
                  </div>

                  <div className="space-y-4 flex-1">
                    <AnimatePresence>
                      {notifications.map((notif, index) => {
                        const style = getNotificationStyle(notif.tipo);
                        
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`border rounded-xl p-4 bg-gradient-to-r ${style.gradient} ${style.box} transition-all duration-300`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="pt-1">{style.icon}</div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className={`px-2 py-1 text-xs text-white rounded-md ${style.badgeColor}`}>
                                    {style.badge}
                                  </span>
                                  <Typography variant="caption" className={darkMode ? "text-slate-400" : "text-slate-600"}>
                                    {notif.tempo}
                                  </Typography>
                                </div>
                                
                                <Typography variant="h6" className={`font-bold mb-1 ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
                                  {notif.linha}
                                </Typography>
                                
                                <Typography variant="body2" className={darkMode ? "text-slate-300" : "text-slate-700"}>
                                  {notif.msg}
                                </Typography>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Ações rápidas - Botões verdes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    fullWidth
                    startIcon={action.icon}
                    onClick={() => navigate(action.path)}
                    sx={{
                      background: darkMode 
                        ? "linear-gradient(135deg, #059669 0%, #047857 100%)" 
                        : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "white",
                      borderRadius: 3,
                      py: 3,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                      '&:hover': {
                        background: darkMode 
                          ? "linear-gradient(135deg, #047857 0%, #065f46 100%)" 
                          : "linear-gradient(135deg, #059669 0%, #047857 100%)",
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px 0 rgba(0,0,0,0.15)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {action.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-8"
          >
            <Card
              className="shadow-2xl rounded-2xl overflow-hidden"
              sx={{
                background: darkMode
                  ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Typography
                    variant="h4"
                    className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    Mapa de Rotas
                  </Typography>
                  
                  <Tooltip title="Informações do mapa">
                    <IconButton 
                      onClick={() => setOpenInfo(true)}
                      sx={{
                        color: darkMode ? "#94a3b8" : "#64748b",
                      }}
                    >
                      <InfoOutlined />
                    </IconButton>
                  </Tooltip>
                </div>

                <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    title="mapa"
                    width="100%"
                    height="100%"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.466170284263!2d-34.8711394!3d-7.1468747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace9b6dc64e6ef%3A0x8b32dfe2d4f0028a!2sJo%C3%A3o%20Pessoa%2C%20PB!5e0!3m2!1spt-BR!2sbr!4v1699630952356!5m2!1spt-BR!2sbr"
                    allowFullScreen
                    loading="lazy"
                    style={{ border: 'none' }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Container>

        {/* Modal de informações */}
        <Dialog 
          open={openInfo} 
          onClose={() => setOpenInfo(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className={darkMode ? "text-green-400" : "text-green-700"}>
            Informações do Mapa
          </DialogTitle>
          <DialogContent>
            <Typography className={darkMode ? "text-slate-300" : "text-slate-700"}>
              O mapa mostra toda a cidade de João Pessoa, PB.
              Um recurso para se guiar pelas rotas de ônibus disponíveis na cidade.
              Utilize os controles do mapa para navegar, ampliar e explorar as áreas de interesse.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setOpenInfo(false)}
              sx={{
                color: darkMode ? "#94a3b8" : "#64748b",
              }}
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}