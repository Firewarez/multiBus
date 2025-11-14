import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import {
  Map,
  CreditCard,
  Policy,
  Edit,
  EvStation,
  Menu as MenuIcon,
  Close as CloseIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

// Validação Zod
const profileSchema = z.object({
  nome: z.string().min(3, "Digite um nome válido."),
  email: z
    .string()
    .email("E-mail inválido")
    .regex(/@.*\.com$/, "Deve conter '@' e terminar com '.com'"),
  cpf: z
    .string()
    .min(11, "O CPF deve ter 11 números.")
    .regex(/^\d{11}$/, "Digite apenas números."),
  telefone: z
    .string()
    .min(10, "Telefone deve conter DDD + número completo.")
    .regex(/^\d{10,11}$/, "Digite apenas números."),
  endereco: z.string().optional(),
  numero: z.string().optional(),
  bairro: z.string().optional(),
  cep: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
});

type ProfileData = z.infer<typeof profileSchema>;

export default function Perfil() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: ProfileData) => {
    alert(`Perfil atualizado com sucesso! 🎉\n\n${JSON.stringify(data, null, 2)}`);
  };

  const drawerWidth = 260;
  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const drawerContent = (
    <div className="flex flex-col justify-between h-full p-4 bg-gradient-to-b from-[#C9DF8A] via-[#77AB59] to-[#36802D] rounded-r-[25px] text-white">
      <div>
        <Typography variant="h6" className="text-white font-bold mb-4">
          MultiBus
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Map className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Mapa de Previsões" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
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

          <ListItem disablePadding component={Link} to="/">
            <ListItemButton>
              <ListItemIcon>
                <Edit className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Início" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Policy className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Política de Privacidade" />
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
      {/* Drawer lateral */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight: "none",
            background: "transparent",
            boxShadow: 3,
          },
        }}
        open
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
              Editar Perfil
            </Typography>
          </div>

          <IconButton onClick={toggleDarkMode}>
            {darkMode ? (
              <Brightness7 className="text-yellow-400" />
            ) : (
              <Brightness4 className="text-gray-700" />
            )}
          </IconButton>
        </div>

        {/* Card principal */}
        <Box className="bg-[#F3F8EC] rounded-xl shadow-md p-6">
          {/* Cabeçalho do perfil */}
          <div className="flex items-center gap-6 mb-6">
            <Avatar
              src="https://i.imgur.com/4YQZ4ZC.png"
              sx={{ width: 120, height: 120, borderRadius: "20px" }}
            />
            <div>
              <Typography variant="h6" className="font-semibold text-green-800">
                Arthur Barcelos
              </Typography>
              <Typography variant="body2" className="text-green-600">
                João Pessoa
              </Typography>
              <Typography variant="body2" className="text-green-600">
                Usuário: arthurbarcelos04@gmail.com
              </Typography>
              <Typography variant="body2" className="text-green-600">
                Celular: (83) 98856-9012
              </Typography>
              <Typography variant="body2" className="text-green-600">
                Status: Ativo
              </Typography>
            </div>
          </div>

          <hr className="border-green-300 mb-4" />

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Linha 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label="Nome Completo"
                fullWidth
                variant="outlined"
                {...register("nome")}
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
              <TextField
                label="E-mail"
                fullWidth
                variant="outlined"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>

            {/* Linha 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <TextField
                label="CPF"
                fullWidth
                variant="outlined"
                {...register("cpf")}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />

              <TextField
                label="Telefone"
                fullWidth
                variant="outlined"
                {...register("telefone")}
                error={!!errors.telefone}
                helperText={errors.telefone?.message}
              />

              <TextField
                label="Cidade"
                fullWidth
                variant="outlined"
                {...register("cidade")}
              />
              <TextField
                label="UF"
                fullWidth
                variant="outlined"
                {...register("uf")}
              />
            </div>

            {/* Linha 3 - Endereço */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <TextField
                label="Rua / Avenida"
                fullWidth
                variant="outlined"
                {...register("endereco")}
              />
              <TextField
                label="Número"
                fullWidth
                variant="outlined"
                {...register("numero")}
              />
              <TextField
                label="Bairro"
                fullWidth
                variant="outlined"
                {...register("bairro")}
              />
              <TextField
                label="CEP"
                fullWidth
                variant="outlined"
                {...register("cep")}
              />
            </div>

            {/* Botão */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="contained"
                className="!bg-[#36802D] hover:!bg-[#2e6b25] text-white font-semibold rounded-xl px-8 py-3"
              >
                Salvar
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
