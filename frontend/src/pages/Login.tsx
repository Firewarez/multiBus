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
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  Tooltip,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  DirectionsBus,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { loginAPI } from "../services/api";

export default function Login() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ✅ CORREÇÃO: Redirecionar para a página anterior ou home
  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Chamar API real de login
      const response = await loginAPI(formData.email, formData.password);
      
      if (response && response.usuario) {
        // Login bem-sucedido
        const userToken = 'jwt-token-' + response.usuario.id;
        login(userToken);
        
        // Salvar informações do usuário
        localStorage.setItem('userId', response.usuario.id);
        localStorage.setItem('userInfo', JSON.stringify(response.usuario));
        
        if (formData.rememberMe) {
          localStorage.setItem('userEmail', formData.email);
        }
        
        navigate(from, { replace: true });
      } else {
        setLoginError("E-mail ou senha incorretos. Tente novamente.");
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      if (error.response?.status === 401) {
        setLoginError("E-mail ou senha incorretos.");
      } else {
        setLoginError("Erro ao conectar com o servidor. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/recuperar-senha");
  };

  const handleCreateAccount = () => {
    navigate("/cadastro");
  };

  // Preencher e-mail salvo ao carregar a página
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        rememberMe: true
      }));
    }
  }, []);

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

      {/* Partículas decorativas */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: darkMode
            ? `radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)`
            : `radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)`,
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
              Seu transporte inteligente
            </Typography>
          </Box>

          {/* Card de Login */}
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
              {/* Toggle de Tema */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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

              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: darkMode ? "#22c55e" : "#10b981",
                  mb: 1,
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                }}
              >
                Bem-vindo de volta
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  color: darkMode ? "#94a3b8" : "#64748b",
                  mb: 4,
                }}
              >
                Entre na sua conta para continuar
              </Typography>

              {/* Alert de erro */}
              {loginError && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    background: darkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
                    color: darkMode ? '#ef4444' : '#dc2626',
                  }}
                >
                  {loginError}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    label="E-mail"
                    value={formData.email}
                    onChange={handleInputChange}
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
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TextField
                    fullWidth
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Senha"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <Lock 
                          sx={{ 
                            color: darkMode ? "#94a3b8" : "#64748b", 
                            mr: 1 
                          }} 
                        />
                      ),
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
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
                </motion.div>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        sx={{
                          color: darkMode ? "#22c55e" : "#10b981",
                          '&.Mui-checked': {
                            color: darkMode ? "#22c55e" : "#10b981",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: darkMode ? "#cbd5e1" : "#374151", fontSize: '0.875rem' }}>
                        Lembrar-me
                      </Typography>
                    }
                  />
                  
                  <Link
                    component="button"
                    type="button"
                    onClick={handleForgotPassword}
                    sx={{
                      color: darkMode ? "#22c55e" : "#10b981",
                      textDecoration: "none",
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Esqueceu a senha?
                  </Link>
                </Box>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      background: loading 
                        ? (darkMode ? "#374151" : "#d1d5db")
                        : (darkMode 
                            ? "linear-gradient(135deg, #059669 0%, #047857 100%)" 
                            : "linear-gradient(135deg, #10b981 0%, #059669 100%)"),
                      color: "white",
                      borderRadius: 2,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      boxShadow: loading ? 'none' : '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        background: loading 
                          ? (darkMode ? "#374151" : "#d1d5db")
                          : (darkMode 
                              ? "linear-gradient(135deg, #047857 0%, #065f46 100%)" 
                              : "linear-gradient(135deg, #059669 0%, #047857 100%)"),
                        boxShadow: loading ? 'none' : '0 8px 25px 0 rgba(0, 0, 0, 0.15)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⏳
                        </motion.div>
                        Entrando...
                      </Box>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </motion.div>
              </form>

              <Divider sx={{ my: 3, borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    color: darkMode ? "#94a3b8" : "#64748b",
                    mb: 2,
                    fontSize: '0.875rem',
                  }}
                >
                  Não tem uma conta?
                </Typography>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleCreateAccount}
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
                    Criar conta
                  </Button>
                </motion.div>
              </Box>

              {/* Informações adicionais */}
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: darkMode ? "#64748b" : "#94a3b8",
                    display: "block",
                    lineHeight: 1.5,
                  }}
                >
                  Ao entrar, você concorda com nossos{" "}
                  <Link
                    href="/termos-uso"
                    sx={{
                      color: darkMode ? "#22c55e" : "#10b981",
                      textDecoration: "none",
                      '&:hover': {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Termos de Serviço
                  </Link>{" "}
                  e{" "}
                  <Link
                    href="/politica-privacidade"
                    sx={{
                      color: darkMode ? "#22c55e" : "#10b981",
                      textDecoration: "none",
                      '&:hover': {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Política de Privacidade
                  </Link>
                </Typography>
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