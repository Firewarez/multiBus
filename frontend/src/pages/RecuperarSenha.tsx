import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Container,
  Link,
  Divider,
  Tooltip,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  Email,
  Lock,
  VpnKey,
  DirectionsBus,
  Brightness4,
  Brightness7,
  ArrowBack,
  CheckCircle,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function RecuperarSenha() {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    codigo: "",
    novaSenha: "",
    confirmarSenha: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const steps = [
    "Informe seu e-mail",
    "Digite o código",
    "Nova senha"
  ];

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrors({ ...errors, email: "E-mail é obrigatório" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ ...errors, email: "E-mail inválido" });
      return;
    }

    setLoading(true);
    // Simular envio de código
    setTimeout(() => {
      setLoading(false);
      setActiveStep(1);
      // Em um caso real, aqui você enviaria o código por e-mail
      console.log("Código enviado para:", email);
    }, 1500);
  };

  const handleCodigoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo) {
      setErrors({ ...errors, codigo: "Código é obrigatório" });
      return;
    }
    if (codigo.length !== 6) {
      setErrors({ ...errors, codigo: "Código deve ter 6 dígitos" });
      return;
    }

    setActiveStep(2);
  };

  const handleNovaSenhaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      novaSenha: "",
      confirmarSenha: "",
    };

    if (!novaSenha) {
      newErrors.novaSenha = "Nova senha é obrigatória";
    } else if (novaSenha.length < 6) {
      newErrors.novaSenha = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!confirmarSenha) {
      newErrors.confirmarSenha = "Confirmação de senha é obrigatória";
    } else if (novaSenha !== confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }

    setErrors({ ...errors, ...newErrors });

    if (!newErrors.novaSenha && !newErrors.confirmarSenha) {
      setLoading(true);
      // Simular redefinição de senha
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }, 1500);
    }
  };

  const handleResendCode = () => {
    setLoading(true);
    // Simular reenvio de código
    setTimeout(() => {
      setLoading(false);
      // Em um caso real, aqui você reenviaria o código
      console.log("Código reenviado para:", email);
    }, 1000);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: darkMode ? "#94a3b8" : "#64748b",
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              Digite seu e-mail cadastrado. Enviaremos um código de verificação para redefinir sua senha.
            </Typography>

            <form onSubmit={handleEmailSubmit}>
              <TextField
                fullWidth
                type="email"
                label="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <Email 
                      sx={{ 
                        color: darkMode ? "#94a3b8" : "#64748b", 
                        mr: 1 
                      }} 
                    />
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    '&:hover fieldset': {
                      borderColor: darkMode ? "#22c55e" : "#10b981",
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: darkMode ? "#22c55e" : "#10b981",
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: darkMode ? "#94a3b8" : "#64748b",
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: darkMode ? "#22c55e" : "#10b981",
                  },
                }}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    background: darkMode 
                      ? "linear-gradient(135deg, #059669 0%, #047857 100%)" 
                      : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white",
                    borderRadius: 2,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: darkMode 
                        ? "linear-gradient(135deg, #047857 0%, #065f46 100%)" 
                        : "linear-gradient(135deg, #059669 0%, #047857 100%)",
                      boxShadow: '0 8px 25px 0 rgba(0, 0, 0, 0.15)',
                    },
                    '&:disabled': {
                      background: darkMode ? '#374151' : '#d1d5db',
                      color: darkMode ? '#9ca3af' : '#6b7280',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? "Enviando código..." : "Enviar código"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: darkMode ? "#94a3b8" : "#64748b",
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              Digite o código de 6 dígitos que enviamos para:
              <br />
              <strong>{email}</strong>
            </Typography>

            <form onSubmit={handleCodigoSubmit}>
              <TextField
                fullWidth
                label="Código de verificação"
                value={codigo}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setCodigo(value);
                  if (errors.codigo) setErrors({ ...errors, codigo: "" });
                }}
                error={!!errors.codigo}
                helperText={errors.codigo}
                placeholder="000000"
                InputProps={{
                  startAdornment: (
                    <VpnKey 
                      sx={{ 
                        color: darkMode ? "#94a3b8" : "#64748b", 
                        mr: 1 
                      }} 
                    />
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    '&:hover fieldset': {
                      borderColor: darkMode ? "#22c55e" : "#10b981",
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: darkMode ? "#22c55e" : "#10b981",
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: darkMode ? "#94a3b8" : "#64748b",
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: darkMode ? "#22c55e" : "#10b981",
                  },
                }}
              />

              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Link
                  component="button"
                  type="button"
                  onClick={handleResendCode}
                  disabled={loading}
                  sx={{
                    color: darkMode ? "#22c55e" : "#10b981",
                    textDecoration: "none",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: "underline",
                    },
                    '&:disabled': {
                      color: darkMode ? '#6b7280' : '#9ca3af',
                      cursor: 'not-allowed',
                    },
                  }}
                >
                  {loading ? "Reenviando..." : "Não recebeu o código? Reenviar"}
                </Link>
              </Box>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  type="submit"
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
                    textTransform: 'none',
                    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: darkMode 
                        ? "linear-gradient(135deg, #047857 0%, #065f46 100%)" 
                        : "linear-gradient(135deg, #059669 0%, #047857 100%)",
                      boxShadow: '0 8px 25px 0 rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Verificar código
                </Button>
              </motion.div>
            </form>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: darkMode ? "#94a3b8" : "#64748b",
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              Digite sua nova senha. Lembre-se de criar uma senha segura.
            </Typography>

            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  background: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)',
                  color: darkMode ? '#22c55e' : '#16a34a',
                }}
              >
                Senha redefinida com sucesso! Redirecionando para o login...
              </Alert>
            )}

            <form onSubmit={handleNovaSenhaSubmit}>
              <TextField
                fullWidth
                type="password"
                label="Nova senha"
                value={novaSenha}
                onChange={(e) => {
                  setNovaSenha(e.target.value);
                  if (errors.novaSenha) setErrors({ ...errors, novaSenha: "" });
                }}
                error={!!errors.novaSenha}
                helperText={errors.novaSenha}
                InputProps={{
                  startAdornment: (
                    <Lock 
                      sx={{ 
                        color: darkMode ? "#94a3b8" : "#64748b", 
                        mr: 1 
                      }} 
                    />
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    '&:hover fieldset': {
                      borderColor: darkMode ? "#22c55e" : "#10b981",
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: darkMode ? "#22c55e" : "#10b981",
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: darkMode ? "#94a3b8" : "#64748b",
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: darkMode ? "#22c55e" : "#10b981",
                  },
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="Confirmar nova senha"
                value={confirmarSenha}
                onChange={(e) => {
                  setConfirmarSenha(e.target.value);
                  if (errors.confirmarSenha) setErrors({ ...errors, confirmarSenha: "" });
                }}
                error={!!errors.confirmarSenha}
                helperText={errors.confirmarSenha}
                InputProps={{
                  startAdornment: (
                    <Lock 
                      sx={{ 
                        color: darkMode ? "#94a3b8" : "#64748b", 
                        mr: 1 
                      }} 
                    />
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    '&:hover fieldset': {
                      borderColor: darkMode ? "#22c55e" : "#10b981",
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: darkMode ? "#22c55e" : "#10b981",
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: darkMode ? "#94a3b8" : "#64748b",
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: darkMode ? "#22c55e" : "#10b981",
                  },
                }}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading || success}
                  sx={{
                    background: darkMode 
                      ? "linear-gradient(135deg, #059669 0%, #047857 100%)" 
                      : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white",
                    borderRadius: 2,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: darkMode 
                        ? "linear-gradient(135deg, #047857 0%, #065f46 100%)" 
                        : "linear-gradient(135deg, #059669 0%, #047857 100%)",
                      boxShadow: '0 8px 25px 0 rgba(0, 0, 0, 0.15)',
                    },
                    '&:disabled': {
                      background: darkMode ? '#374151' : '#d1d5db',
                      color: darkMode ? '#9ca3af' : '#6b7280',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? "Redefinindo senha..." : success ? "✓ Senha Redefinida" : "Redefinir senha"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        );

      default:
        return null;
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
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

      <Container 
        maxWidth="sm" 
        sx={{ 
          position: "relative", 
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut" 
              }}
            >
              <DirectionsBus 
                sx={{ 
                  fontSize: 64, 
                  color: darkMode ? "#22c55e" : "#10b981",
                  mb: 2 
                }} 
              />
            </motion.div>
            
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                background: darkMode
                  ? "linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)"
                  : "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: '2.5rem', sm: '3rem' },
                mb: 1,
              }}
            >
              MultiBus
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: darkMode ? "#cbd5e1" : "#64748b",
                fontSize: { xs: '1rem', sm: '1.25rem' },
                mb: 3,
              }}
            >
              Recuperar Senha
            </Typography>
          </Box>

          {/* Card de Recuperação de Senha */}
          <Card
            sx={{
              background: darkMode
                ? "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
              borderRadius: 4,
              boxShadow: darkMode 
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              {/* Header do Card */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <IconButton 
                    onClick={handleBackToLogin}
                    sx={{
                      color: darkMode ? "#22c55e" : "#10b981",
                    }}
                  >
                    <ArrowBack />
                  </IconButton>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: darkMode ? "#22c55e" : "#10b981",
                    }}
                  >
                    Recuperar Senha
                  </Typography>
                </Box>

                <Tooltip title={darkMode ? "Modo claro" : "Modo escuro"}>
                  <IconButton 
                    onClick={toggleDarkMode}
                    sx={{
                      backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                      color: darkMode ? "#22c55e" : "#10b981",
                      '&:hover': {
                        backgroundColor: darkMode ? "rgba(34, 197, 94, 0.2)" : "rgba(16, 185, 129, 0.2)",
                      }
                    }}
                  >
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Stepper */}
              <Stepper 
                activeStep={activeStep} 
                sx={{ 
                  mb: 4,
                  '& .MuiStepLabel-root .Mui-completed': {
                    color: darkMode ? '#22c55e' : '#10b981',
                  },
                  '& .MuiStepLabel-root .Mui-active': {
                    color: darkMode ? '#22c55e' : '#10b981',
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Conteúdo do Step */}
              {getStepContent(activeStep)}

              <Divider sx={{ my: 3, borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    color: darkMode ? "#94a3b8" : "#64748b",
                    mb: 2,
                    fontSize: '0.875rem',
                  }}
                >
                  Lembrou sua senha?
                </Typography>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleBackToLogin}
                    sx={{
                      color: darkMode ? "#22c55e" : "#10b981",
                      borderColor: darkMode ? "#22c55e" : "#10b981",
                      borderRadius: 2,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: darkMode ? "#22c55e" : "#10b981",
                        backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                      },
                    }}
                  >
                    Voltar para o Login
                  </Button>
                </motion.div>
              </Box>
            </CardContent>
          </Card>

          {/* Versão */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              mt: 3,
              color: darkMode ? "#64748b" : "#94a3b8",
            }}
          >
            v2.1.0 • MultiBus Transporte Inteligente
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}