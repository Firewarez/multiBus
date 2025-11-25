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
  Person,
  Phone,
  LocationOn,
  DirectionsBus,
  Brightness4,
  Brightness7,
  ArrowBack,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { registerAPI } from "../services/api";

export default function Cadastro() {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    uf: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    uf: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

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
  };

  const validateForm = () => {
    const newErrors = {
      nome: "",
      email: "",
      telefone: "",
      cidade: "",
      uf: "",
      password: "",
      confirmPassword: "",
      acceptTerms: "",
    };

    if (!formData.nome) {
      newErrors.nome = "Nome completo é obrigatório";
    }

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.telefone) {
      newErrors.telefone = "Telefone é obrigatório";
    } else if (formData.telefone.length < 11) {
      newErrors.telefone = "Telefone deve ter 11 dígitos";
    }

    if (!formData.cidade) {
      newErrors.cidade = "Cidade é obrigatória";
    }

    if (!formData.uf) {
      newErrors.uf = "UF é obrigatória";
    } else if (formData.uf.length !== 2) {
      newErrors.uf = "UF deve ter 2 caracteres";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Você deve aceitar os termos e condições";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess(false);

    if (validateForm()) {
      try {
        // Remover formatação do telefone (apenas números)
        const telefoneNumeros = formData.telefone.replace(/\D/g, '');

        // Criar data de nascimento (placeholder - você pode adicionar campo no form depois)
        const nascimento = new Date('2000-01-01').toISOString();

        // Gerar CPF único temporário (timestamp + random)
        const cpfTemporario = `${Date.now()}${Math.floor(Math.random() * 100)}`.slice(0, 11).padStart(11, '0');

        const userData = {
          nome: formData.nome,
          email: formData.email,
          cpf: cpfTemporario, // CPF temporário único até adicionar campo no form
          telefone: telefoneNumeros,
          senha: formData.password,
          nascimento: nascimento
        };

        const response = await registerAPI(userData);
        
        if (response) {
          setRegisterSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error: any) {
        console.error("Erro no cadastro:", error);
        if (error.response?.status === 400) {
          setRegisterError("Dados inválidos. Verifique os campos.");
        } else if (error.response?.status === 409) {
          setRegisterError("Este e-mail já está cadastrado. Faça login ou use outro e-mail.");
        } else if (error.response?.data?.message) {
          setRegisterError(error.response.data.message);
        } else if (error.response?.data?.error) {
          setRegisterError(error.response.data.error);
        } else {
          setRegisterError("Erro ao criar conta. Tente novamente.");
        }
      }
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 2) {
        return numbers;
      } else if (numbers.length <= 7) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      } else {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
      }
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhone(e.target.value);
    setFormData(prev => ({
      ...prev,
      telefone: formattedValue
    }));
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
        maxWidth="md" 
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
              Crie sua conta
            </Typography>
          </Box>

          {/* Card de Cadastro */}
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
                    Criar Conta
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

              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  color: darkMode ? "#94a3b8" : "#64748b",
                  mb: 4,
                }}
              >
                Preencha os dados abaixo para criar sua conta
              </Typography>

              {registerError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {registerError}
                </Alert>
              )}

              {registerSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Conta criada com sucesso! Redirecionando para login...
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Nome */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <TextField
                      fullWidth
                      name="nome"
                      label="Nome Completo"
                      value={formData.nome}
                      onChange={handleInputChange}
                      error={!!errors.nome}
                      helperText={errors.nome}
                      InputProps={{
                        startAdornment: (
                          <Person 
                            sx={{ 
                              color: darkMode ? "#94a3b8" : "#64748b", 
                              mr: 1 
                            }} 
                          />
                        ),
                      }}
                      sx={{
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

                  {/* Email */}
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

                  {/* Telefone */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <TextField
                      fullWidth
                      name="telefone"
                      label="Telefone"
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      error={!!errors.telefone}
                      helperText={errors.telefone}
                      placeholder="(00) 00000-0000"
                      InputProps={{
                        startAdornment: (
                          <Phone 
                            sx={{ 
                              color: darkMode ? "#94a3b8" : "#64748b", 
                              mr: 1 
                            }} 
                          />
                        ),
                      }}
                      sx={{
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

                  {/* Cidade e UF */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <TextField
                        fullWidth
                        name="cidade"
                        label="Cidade"
                        value={formData.cidade}
                        onChange={handleInputChange}
                        error={!!errors.cidade}
                        helperText={errors.cidade}
                        InputProps={{
                          startAdornment: (
                            <LocationOn 
                              sx={{ 
                                color: darkMode ? "#94a3b8" : "#64748b", 
                                mr: 1 
                              }} 
                            />
                          ),
                        }}
                        sx={{
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
                      transition={{ delay: 0.5 }}
                    >
                      <TextField
                        fullWidth
                        name="uf"
                        label="UF"
                        value={formData.uf}
                        onChange={handleInputChange}
                        error={!!errors.uf}
                        helperText={errors.uf}
                        placeholder="SP"
                        inputProps={{ maxLength: 2 }}
                        sx={{
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
                  </div>

                  {/* Senha */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
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

                  {/* Confirmar Senha */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <TextField
                      fullWidth
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      label="Confirmar Senha"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
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
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                      }}
                      sx={{
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
                </div>

                {/* Termos e Condições */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="acceptTerms"
                        checked={formData.acceptTerms}
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
                        Eu concordo com os{" "}
                        <Link
                          href="/termos"
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
                          href="/privacidade"
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
                    }
                  />
                  {errors.acceptTerms && (
                    <Typography color="error" variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                      {errors.acceptTerms}
                    </Typography>
                  )}
                </motion.div>

                {/* Botão Confirmar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6"
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
                    Confirmar Cadastro
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
                  Já tem uma conta?
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
                    Fazer Login
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