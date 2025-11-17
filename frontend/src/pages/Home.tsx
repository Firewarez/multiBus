import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  IconButton,
  Card,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Map,
  CreditCard,
  Policy,
  Edit,
  Search,
  Star,
  Share,
  SupportAgent,
  HelpOutline,
  Gavel,
  LocationOn,
  Brightness4,
  Brightness7,
  EvStation,
  InfoOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [openInfo, setOpenInfo] = useState(false); // modal de legenda

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const drawerWidth = 260;
  const navigate = useNavigate();

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
    <div className="flex flex-col justify-between h-full p-4 bg-gradient-to-b from-[#C9DF8A] via-[#77AB59] to-[#36802D] rounded-r-[25px] text-white">
      <div>
        <Typography variant="h6" className="text-white font-bold mb-4">
          MultiBus
        </Typography>
        <List>
          <ListItem disablePadding component={Link} to="/mapa-previsoes">
            <ListItemButton>
              <ListItemIcon>
                <Map className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Mapa de Previsões" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding component={Link} to="/recarga-cartao">
            <ListItemButton>
              <ListItemIcon>
                <CreditCard className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Recarregar Cartões" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EvStation className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Pontos de Recarga" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding component={Link} to="/politica-privacidade">
            <ListItemButton>
              <ListItemIcon>
                <Policy className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Política de Privacidade" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding component={Link} to="/perfil">
            <ListItemButton>
              <ListItemIcon>
                <Edit className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Editar Perfil" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>

      <Box className="flex items-center gap-2">
        <Avatar src="https://i.imgur.com/4YQZ4ZC.png" />
        <div className="flex flex-col leading-tight">
          <Typography variant="body2" className="text-white font-semibold">
            Arthur Barcelos
          </Typography>
          <Typography variant="caption" className="text-white">
            João Pessoa, PB
          </Typography>
        </div>
      </Box>
    </div>
  );

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: darkMode ? "#1B1B1B" : "#E8F5E9",
        minHeight: "100vh",
        color: darkMode ? "white" : "black",
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
            borderRight: "none",
            background: "transparent",
            boxShadow: 3,
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
            borderRight: "none",
            boxShadow: 3,
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
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              className="md:hidden bg-green-600 text-white hover:bg-green-700"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              variant="h5"
              className={`font-bold ${
                darkMode ? "text-green-200" : "text-green-800"
              }`}
            >
              Bem-vindo ao MultiBus
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <Typography variant="body1">
              Olá, Arthur Barcelos! • {currentTime}
            </Typography>
            <IconButton onClick={toggleDarkMode}>
              {darkMode ? (
                <Brightness7 className="text-yellow-400" />
              ) : (
                <Brightness4 className="text-gray-700" />
              )}
            </IconButton>
          </div>
        </div>

        {/* Campo de busca */}
        <div className="mb-6">
          <TextField
            fullWidth
            placeholder="Pesquisar linha ou destino..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              className:
                "bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-green-400",
            }}
          />
        </div>

        {/* Perfil + Linhas favoritas */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Card do perfil */}
          <Card className="flex-1 shadow-md rounded-xl p-4 flex items-center gap-4">
            <Avatar
              src="https://i.imgur.com/4YQZ4ZC.png"
              sx={{ width: 100, height: 100, borderRadius: "20px" }}
            />
            <div>
              <Typography
                variant="h6"
                className="font-semibold text-green-700 mb-1"
              >
                Arthur Barcelos
              </Typography>
              <Typography variant="body2">
                arthurbarcelos04@gmail.com
              </Typography>
              <Typography variant="body2">(83) 98856-9012</Typography>
            </div>
          </Card>

          {/* Favoritos */}
          <Card className="flex-1 shadow-md rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <Typography
                variant="h6"
                className="font-semibold text-green-700 flex items-center"
              >
                <Star className="text-yellow-500 mr-1" /> Linhas Favoritas
              </Typography>
              <IconButton onClick={() => setOpenInfo(true)}>
                <InfoOutlined className="text-green-700" />
              </IconButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { nome: "120 - Parque do Sol / Geisel", status: "A caminho" },
                { nome: "518 - Bancários / UFPB", status: "Em operação" },
                { nome: "551 - Geisel / Mangabeira", status: "Na garagem" },
                { nome: "1500 - Circular", status: "A caminho" },
              ].map((linha) => (
                <div
                  key={linha.nome}
                  className="bg-green-100 px-3 py-2 rounded-lg shadow flex items-center justify-between"
                >
                  <Typography
                    variant="body2"
                    className="text-green-800 font-medium"
                  >
                    {linha.nome}
                  </Typography>
                  <LocationOn
                    className={`${
                      linha.status === "A caminho"
                        ? "text-green-600"
                        : linha.status === "Em operação"
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Modal de legenda */}
        <Dialog open={openInfo} onClose={() => setOpenInfo(false)}>
          <DialogTitle>Legenda das Cores dos Ônibus</DialogTitle>
          <DialogContent>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                <span className="text-green-600 font-semibold">Verde</span> — Ônibus a caminho.
              </li>
              <li>
                <span className="text-yellow-600 font-semibold">Amarelo</span> — Ônibus em operação.
              </li>
              <li>
                <span className="text-gray-500 font-semibold">Cinza</span> — Ônibus na garagem.
              </li>
            </ul>
          </DialogContent>
        </Dialog>

        {/* Botões interativos */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Compartilhe", icon: <Share fontSize="medium" />, path: "/compartilhe" },
            { label: "Suporte", icon: <SupportAgent fontSize="medium" />, path: "/suporte" },
            { label: "Ajuda", icon: <HelpOutline fontSize="medium" />, path: "/ajuda" },
            { label: "Termos de Uso", icon: <Gavel fontSize="medium" />, path: "/termos-uso" },
          ].map((btn) => (
            <Button
              key={btn.label}
              variant="contained"
              startIcon={btn.icon}
              onClick={() => navigate(btn.path)}
              className="!bg-[#36802D] hover:!bg-[#2e6b25] text-white text-base font-semibold shadow-md rounded-xl flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 transition-all duration-300 hover:scale-[1.02]"
              sx={{
                minHeight: "60px",
                borderRadius: "12px",
              }}
            >
              {btn.label}
            </Button>
          ))}
        </div>

        {/* Mapa */}
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="mapa"
            width="100%"
            height="100%"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.466170284263!2d-34.8711394!3d-7.1468747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace9b6dc64e6ef%3A0x8b32dfe2d4f0028a!2sJo%C3%A3o%20Pessoa%2C%20PB!5e0!3m2!1spt-BR!2sbr!4v1699630952356!5m2!1spt-BR!2sbr"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </Box>
    </Box>
  );
}
