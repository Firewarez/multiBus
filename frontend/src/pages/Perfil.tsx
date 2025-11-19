import React, { useState } from "react";
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
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  ArrowBack,
  Edit,
  Save,
  CheckCircle,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nome: "Arthur Barcelos",
      email: "arthurbarcelos04@gmail.com",
      telefone: "83988569012",
      cidade: "João Pessoa",
      uf: "PB",
    },
  });

  const onSubmit = (data: ProfileData) => {
    console.log("Dados salvos:", data);
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    reset();
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
          height: "30vh",
          background: darkMode 
            ? "linear-gradient(135deg, #059669 0%, #0ea5e9 100%)"
            : "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        {/* Cabeçalho */}
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
              <Edit sx={{ fontSize: 32, color: darkMode ? "#22c55e" : "#10b981" }} />
            </motion.div>
            <div>
              <Typography
                variant="h3"
                className={`font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}
              >
                Meu Perfil
              </Typography>
              <Typography
                variant="subtitle1"
                className={darkMode ? "text-slate-300" : "text-slate-600"}
              >
                Gerencie suas informações pessoais
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-2">
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

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Coluna lateral */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card
              className="shadow-xl rounded-2xl sticky top-8"
              sx={{
                background: darkMode
                  ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
              }}
            >
              <CardContent className="p-6 text-center">
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
                  variant="h6" 
                  className={`font-bold mb-2 ${darkMode ? "text-green-400" : "text-green-700"}`}
                >
                  Arthur Barcelos
                </Typography>

                <Chip
                  icon={<CheckCircle sx={{ fontSize: 16 }} />}
                  label="Conta Verificada"
                  color="success"
                  variant="outlined"
                  size="small"
                  sx={{ mb: 3 }}
                />

                <div className="space-y-3 text-left">
                  <div>
                    <Typography variant="caption" className={darkMode ? "text-slate-400" : "text-slate-600"}>
                      Localização
                    </Typography>
                    <Typography variant="body2" className={darkMode ? "text-slate-200" : "text-slate-800"}>
                      João Pessoa, PB
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="caption" className={darkMode ? "text-slate-400" : "text-slate-600"}>
                      Membro desde
                    </Typography>
                    <Typography variant="body2" className={darkMode ? "text-slate-200" : "text-slate-800"}>
                      Janeiro 2024
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="caption" className={darkMode ? "text-slate-400" : "text-slate-600"}>
                      Status
                    </Typography>
                    <Typography variant="body2" className={darkMode ? "text-slate-200" : "text-slate-800"}>
                      <span className="text-green-500 font-semibold">Ativo</span>
                    </Typography>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6"
                >
                  <Button
                    fullWidth
                    startIcon={<Edit />}
                    onClick={handleEdit}
                    disabled={isEditing}
                    variant="outlined"
                    sx={{
                      color: darkMode ? "#e2e8f0" : "#475569",
                      borderColor: darkMode ? "#475569" : "#cbd5e1",
                      '&:hover': {
                        borderColor: darkMode ? "#22c55e" : "#10b981",
                        backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                      },
                      '&:disabled': {
                        borderColor: darkMode ? "#374151" : "#d1d5db",
                        color: darkMode ? "#6b7280" : "#9ca3af",
                      }
                    }}
                  >
                    Editar Perfil
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Formulário principal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Card
              className="shadow-2xl rounded-3xl overflow-hidden"
              sx={{
                background: darkMode
                  ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Typography
                    variant="h4"
                    className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    Informações Pessoais
                  </Typography>

                  <AnimatePresence>
                    {saveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Chip
                          icon={<CheckCircle />}
                          label="Alterações salvas!"
                          color="success"
                          variant="filled"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Linha 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <TextField
                        label="Nome Completo"
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                        {...register("nome")}
                        error={!!errors.nome}
                        helperText={errors.nome?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                          }
                        }}
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }}>
                      <TextField
                        label="E-mail"
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                          }
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Linha 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <TextField
                        label="CPF"
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                        {...register("cpf")}
                        error={!!errors.cpf}
                        helperText={errors.cpf?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                          }
                        }}
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }}>
                      <TextField
                        label="Telefone"
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                        {...register("telefone")}
                        error={!!errors.telefone}
                        helperText={errors.telefone?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                          }
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Linha 3 - Endereço */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <TextField
                        label="Cidade"
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                        {...register("cidade")}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                          }
                        }}
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }}>
                      <TextField
                        label="UF"
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                        {...register("uf")}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                          }
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Linha 4 - Endereço detalhado */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <motion.div whileHover={{ scale: 1.01 }} className="md:col-span-2">
                      <TextField
                        label="Rua / Avenida"
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                        {...register("endereco")}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                          }
                        }}
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }}>
                      <TextField
                        label="Número"
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                        {...register("numero")}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                          }
                        }}
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }}>
                      <TextField
                        label="CEP"
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                        {...register("cep")}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                          }
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} className="md:col-span-2">
                    <TextField
                      label="Bairro"
                      fullWidth
                      variant="outlined"
                      disabled={!isEditing}
                      {...register("bairro")}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                        }
                      }}
                    />
                  </motion.div>

                  {/* Botões de ação */}
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 justify-end pt-4"
                    >
                      <Button
                        onClick={handleCancel}
                        variant="outlined"
                        sx={{
                          color: darkMode ? "#e2e8f0" : "#475569",
                          borderColor: darkMode ? "#475569" : "#cbd5e1",
                          borderRadius: 2,
                          px: 4,
                          '&:hover': {
                            borderColor: darkMode ? "#ef4444" : "#dc2626",
                            backgroundColor: darkMode ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.1)",
                          }
                        }}
                      >
                        Cancelar
                      </Button>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          type="submit"
                          startIcon={<Save />}
                          variant="contained"
                          sx={{
                            background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                            color: "white",
                            borderRadius: 2,
                            px: 4,
                            '&:hover': {
                              background: "linear-gradient(135deg, #059669 0%, #2563eb 100%)",
                            }
                          }}
                        >
                          Salvar Alterações
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>

      {/* FAB para voltar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="fixed bottom-6 left-6"
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