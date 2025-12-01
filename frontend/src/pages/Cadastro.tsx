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
  Modal,
  Fade,
  Backdrop,
  Paper,
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
  Close,
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<"terms" | "privacy">("terms");
  
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

    // Validação do telefone - apenas números e 11 dígitos
    if (!formData.telefone) {
      newErrors.telefone = "Telefone é obrigatório";
    } else {
      const telefoneNumeros = formData.telefone.replace(/\D/g, '');
      if (telefoneNumeros.length !== 11) {
        newErrors.telefone = "Telefone deve ter 11 dígitos (DDD + número)";
      } else if (!/^\d+$/.test(telefoneNumeros)) {
        newErrors.telefone = "Telefone deve conter apenas números";
      }
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

        // Validar novamente o telefone antes de enviar
        if (telefoneNumeros.length !== 11) {
          setErrors(prev => ({
            ...prev,
            telefone: "Telefone deve ter 11 dígitos"
          }));
          return;
        }

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
    // Remover todos os não-dígitos
    const numbers = value.replace(/\D/g, '');
    
    // Limitar a 11 dígitos (DDD + 9 dígitos)
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplicar a formatação
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permite apenas números e formata
    let value = e.target.value;
    
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    // Aplica formatação
    const formattedValue = formatPhone(value);
    
    setFormData(prev => ({
      ...prev,
      telefone: formattedValue
    }));
    
    // Limpa erro se existir
    if (errors.telefone) {
      setErrors(prev => ({
        ...prev,
        telefone: ""
      }));
    }
  };

  // Função para evitar entrada de letras via colar
  const handlePhonePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    
    // Remove todos os não-dígitos
    const numbersOnly = pastedText.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limitedNumbers = numbersOnly.slice(0, 11);
    
    // Aplica formatação
    const formattedValue = formatPhone(limitedNumbers);
    
    setFormData(prev => ({
      ...prev,
      telefone: formattedValue
    }));
  };

  const handleOpenModal = (content: "terms" | "privacy") => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Conteúdo dos modais
  const modalContents = {
    terms: {
      title: "Termos de Serviço",
      content: `
        <h2>Termos de Serviço do MultiBus</h2>
        <p><strong>Última atualização:</strong> ${new Date().toLocaleDateString()}</p>
        
        <h3>1. Aceitação dos Termos</h3>
        <p>Ao acessar e usar o MultiBus, você concorda em cumprir e estar vinculado a estes Termos de Serviço.</p>
        
        <h3>2. Serviços Oferecidos</h3>
        <p>O MultiBus oferece serviços de consulta e reserva de passagens de ônibus, incluindo:</p>
        <ul>
          <li>Busca de rotas e horários</li>
          <li>Reserva de assentos</li>
          <li>Pagamento online</li>
          <li>Gestão de reservas</li>
        </ul>
        
        <h3>3. Cadastro do Usuário</h3>
        <p>Para utilizar nossos serviços, você precisa criar uma conta fornecendo informações precisas e completas.</p>
        
        <h3>4. Responsabilidades</h3>
        <p>Você é responsável por manter a confidencialidade de sua conta e senha.</p>
        
        <h3>5. Modificações nos Termos</h3>
        <p>Reservamos o direito de modificar estes termos a qualquer momento.</p>
      `
    },
    privacy: {
      title: "Política de Privacidade",
      content: `
        <h2>Política de Privacidade do MultiBus</h2>
        <p><strong>Última atualização:</strong> ${new Date().toLocaleDateString()}</p>
        
        <h3>1. Informações Coletadas</h3>
        <p>Coletamos as seguintes informações:</p>
        <ul>
          <li>Dados pessoais (nome, e-mail, telefone)</li>
          <li>Dados de localização</li>
          <li>Informações de pagamento</li>
          <li>Dados de uso do serviço</li>
        </ul>
        
        <h3>2. Uso das Informações</h3>
        <p>Utilizamos suas informações para:</p>
        <ul>
          <li>Fornecer e melhorar nossos serviços</li>
          <li>Processar reservas e pagamentos</li>
          <li>Enviar notificações importantes</li>
          <li>Personalizar sua experiência</li>
        </ul>
        
        <h3>3. Compartilhamento de Dados</h3>
        <p>Não vendemos suas informações pessoais. Compartilhamos dados apenas com:</p>
        <ul>
          <li>Empresas de ônibus parceiras</li>
          <li>Processadores de pagamento</li>
          <li>Quando exigido por lei</li>
        </ul>
        
        <h3>4. Segurança</h3>
        <p>Implementamos medidas de segurança para proteger suas informações.</p>
        
        <h3>5. Seus Direitos</h3>
        <p>Você tem direito a acessar, corrigir e excluir seus dados pessoais.</p>
        
        <h3>6. Contato</h3>
        <p>Para dúvidas sobre privacidade, entre em contato: privacidade@multibus.com</p>
      `
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
                  {/* Campos do formulário */}
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
                      onPaste={handlePhonePaste}
                      error={!!errors.telefone}
                      helperText={errors.telefone}
                      placeholder="(00) 00000-0000"
                      inputProps={{
                        maxLength: 15, // Com formatação: (99) 99999-9999 = 15 caracteres
                        inputMode: "numeric" // Para mobile mostrar teclado numérico
                      }}
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
                          component="button"
                          type="button"
                          onClick={() => handleOpenModal("terms")}
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
                          component="button"
                          type="button"
                          onClick={() => handleOpenModal("privacy")}
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

      {/* Modal para Termos e Política de Privacidade */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Fade in={modalOpen}>
          <Paper
            sx={{
              maxWidth: 800,
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              background: darkMode
                ? "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
              borderRadius: 4,
              boxShadow: darkMode 
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              p: 4,
              position: 'relative',
            }}
          >
            {/* Header do Modal */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: darkMode ? "#22c55e" : "#10b981",
                }}
              >
                {modalContents[modalContent].title}
              </Typography>
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  color: darkMode ? "#94a3b8" : "#64748b",
                  '&:hover': {
                    backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Close />
              </IconButton>
            </Box>

            {/* Conteúdo do Modal */}
            <Box
              sx={{
                color: darkMode ? "#cbd5e1" : "#374151",
                lineHeight: 1.6,
                '& h2': {
                  color: darkMode ? "#22c55e" : "#10b981",
                  mt: 3,
                  mb: 2,
                },
                '& h3': {
                  color: darkMode ? "#22c55e" : "#10b981",
                  mt: 2,
                  mb: 1,
                },
                '& p': {
                  mb: 2,
                },
                '& ul': {
                  pl: 3,
                  mb: 2,
                },
                '& li': {
                  mb: 1,
                },
                '& strong': {
                  color: darkMode ? "#22c55e" : "#10b981",
                },
              }}
              dangerouslySetInnerHTML={{ __html: modalContents[modalContent].content }}
            />

            {/* Botão de Fechar */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                onClick={handleCloseModal}
                variant="contained"
                sx={{
                  background: darkMode 
                    ? "linear-gradient(135deg, #059669 0%, #047857 100%)" 
                    : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  borderRadius: 2,
                  px: 4,
                  '&:hover': {
                    background: darkMode 
                      ? "linear-gradient(135deg, #047857 0%, #065f46 100%)" 
                      : "linear-gradient(135deg, #059669 0%, #047857 100%)",
                  },
                }}
              >
                Fechar
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </Box>
  );
}