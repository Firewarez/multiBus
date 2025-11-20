import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Fab,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  SupportAgent,
  Email,
  CheckCircle,
  ArrowBack,
  Brightness4,
  Brightness7,
  Send,
  Person,
  Message,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Suporte() {
  const [darkMode, setDarkMode] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio
    console.log("Dados do formulário:", formData);
    setSubmitSuccess(true);
    setFormData({ nome: "", email: "", mensagem: "" });
    setTimeout(() => setSubmitSuccess(false), 4000);
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

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div></div>
          
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
        </motion.div>

        {/* Card do formulário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
              <div className="text-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-4"
                >
                  <SupportAgent sx={{ 
                    fontSize: 64, 
                    color: darkMode ? "#22c55e" : "#10b981" 
                  }} />
                </motion.div>
                
                <Typography
                  variant="h3"
                  className={`font-bold mb-3 ${darkMode ? "text-green-300" : "text-green-700"}`}
                >
                  Suporte ao Usuário
                </Typography>
                
                <Typography
                  variant="h6"
                  className={darkMode ? "text-slate-300" : "text-slate-600"}
                >
                  Estamos aqui para ajudar! Descreva seu problema ou sugestão.
                </Typography>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <TextField
                    fullWidth
                    label="Seu nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: <Person sx={{ color: darkMode ? "#94a3b8" : "#64748b", mr: 1 }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: <Email sx={{ color: darkMode ? "#94a3b8" : "#64748b", mr: 1 }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <TextField
                    fullWidth
                    label="Mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    multiline
                    rows={6}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: <Message sx={{ color: darkMode ? "#94a3b8" : "#64748b", mr: 1, alignSelf: 'flex-start', mt: 1 }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    fullWidth
                    startIcon={<Send />}
                    variant="contained"
                    size="large"
                    sx={{
                      background: darkMode 
                        ? "linear-gradient(135deg, #059669 0%, #047857 100%)" 
                        : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "white",
                      borderRadius: 2,
                      py: 1.5,
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
                    Enviar Mensagem
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* FAB para voltar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="fixed bottom-6 left-6"
        style={{ zIndex: 9999 }}
      >
        <Tooltip title="Voltar">
          <Fab
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: darkMode ? "#22c55e" : "#10b981",
              color: "white",
              '&:hover': {
                backgroundColor: darkMode ? "#16a34a" : "#059669",
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowBack />
          </Fab>
        </Tooltip>
      </motion.div>

      {/* Snackbar de confirmação */}
      <Snackbar
        open={submitSuccess}
        autoHideDuration={4000}
        onClose={() => setSubmitSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          icon={<CheckCircle />}
          sx={{
            background: darkMode 
              ? "linear-gradient(135deg, #059669 0%, #047857 100%)" 
              : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: 'white',
            borderRadius: 3,
          }}
        >
          Mensagem enviada com sucesso! Entraremos em contato em breve.
        </Alert>
      </Snackbar>
    </Box>
  );
}