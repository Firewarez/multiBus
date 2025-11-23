import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Chip,
  Fab,
  Tooltip,
  Container,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  ThumbUpAltOutlined,
  ThumbUpAlt,
  ExpandMore,
  Security,
  DataUsage,
  Share,
  Delete,
  Download,
  ArrowBack,
  ArrowForward,
  Policy,
  VerifiedUser,
  Person,
  Public,
  Storage,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, Shield, Users, Database, Globe, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Ajuste o caminho conforme necessário

export default function PoliticaPrivacidade() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const navigate = useNavigate();

  // Usando o contexto de tema
  const { darkMode, toggleDarkMode } = useTheme();

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const cards = [
    {
      title: "Coleta de Dados",
      icon: <Storage sx={{ fontSize: 24 }} />,
      text: `O MultiBus coleta apenas informações essenciais para fornecer os melhores serviços de transporte. Coletamos dados como nome, email, localização aproximada e histórico de buscas para personalizar sua experiência e melhorar nossos serviços.`,
      details: [
        "Dados de perfil (nome, email, preferências)",
        "Localização aproximada para mostrar linhas próximas",
        "Histórico de buscas e rotas favoritas",
        "Dados de uso para melhorar a experiência"
      ]
    },
    {
      title: "Uso das Informações",
      icon: <Public sx={{ fontSize: 24 }} />,
      text: `Utilizamos seus dados exclusivamente para otimizar sua experiência no aplicativo. Desenvolvemos rotas personalizadas, mostramos linhas relevantes e melhoramos continuamente nossos serviços com base no feedback e padrões de uso.`,
      details: [
        "Personalização de rotas e sugestões",
        "Otimização de tempos de chegada",
        "Melhoria contínua dos serviços",
        "Comunicação sobre atualizações"
      ]
    },
    {
      title: "Segurança e Proteção",
      icon: <Security sx={{ fontSize: 24 }} />,
      text: `Implementamos medidas robustas de segurança para proteger seus dados. Utilizamos criptografia de ponta a ponta, autenticação segura e seguimos as melhores práticas do mercado para garantir a privacidade das suas informações.`,
      details: [
        "Criptografia AES-256 para todos os dados",
        "Autenticação de dois fatores opcional",
        "Backups seguros e regulares",
        "Conformidade com LGPD e GDPR"
      ]
    },
    {
      title: "Compartilhamento",
      icon: <Share sx={{ fontSize: 24 }} />,
      text: `Seus dados pessoais nunca são compartilhados com terceiros sem seu consentimento explícito. Trabalhamos apenas com parceiros que seguem os mesmos rigorosos padrões de segurança e privacidade.`,
      details: [
        "Nenhum dado vendido a terceiros",
        "Parceiros certificados em segurança",
        "Compartilhamento apenas com consentimento",
        "Transparência total no uso de dados"
      ]
    },
    {
      title: "Seus Direitos",
      icon: <VerifiedUser sx={{ fontSize: 24 }} />,
      text: `Você tem total controle sobre seus dados. Pode acessar, corrigir, exportar ou excluir suas informações a qualquer momento através das configurações do aplicativo ou entrando em contato com nossa equipe.`,
      details: [
        "Acesso completo aos dados armazenados",
        "Correção de informações incorretas",
        "Exportação de dados em formatos padrão",
        "Exclusão permanente da conta"
      ]
    }
  ];

  const progressSteps = [20, 40, 60, 80, 100];
  const progress = progressSteps[activeIndex];

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Efeito de rotação automática
  useEffect(() => {
    const interval = setInterval(() => {
      nextCard();
    }, 8000);
    return () => clearInterval(interval);
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

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between py-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Policy sx={{ fontSize: 32, color: darkMode ? "#22c55e" : "#10b981" }} />
            </motion.div>
            <div>
              <Typography
                variant="h3"
                className={`font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}
              >
                Política de Privacidade
              </Typography>
              <Typography
                variant="subtitle1"
                className={darkMode ? "text-slate-300" : "text-slate-600"}
              >
                Transparência e segurança em primeiro lugar
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

        {/* Indicador de progresso */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Box className="flex items-center justify-between mb-2">
            <Typography variant="body2" className={darkMode ? "text-slate-400" : "text-slate-600"}>
              Seção {activeIndex + 1} de {cards.length}
            </Typography>
            <Typography variant="body2" className={darkMode ? "text-slate-400" : "text-slate-600"}>
              {progress}% concluído
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #10b981 0%, #3b82f6 100%)",
                borderRadius: 4,
                transition: "all 0.5s ease-in-out",
              },
            }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Card principal */}
          <motion.div 
            className="lg:col-span-2"
            layout
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
              >
                <Card
                  className="shadow-2xl rounded-3xl overflow-hidden"
                  sx={{
                    background: darkMode
                      ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                      : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                    minHeight: "480px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent className="flex-1 flex flex-col p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={darkMode ? "text-green-400" : "text-green-600"}
                      >
                        {cards[activeIndex].icon}
                      </motion.div>
                      <Typography 
                        variant="h4" 
                        className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}
                      >
                        {cards[activeIndex].title}
                      </Typography>
                    </div>

                    <Typography
                      variant="body1"
                      className={`leading-relaxed text-lg mb-6 ${
                        darkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                      sx={{ lineHeight: 1.8, flex: 1 }}
                    >
                      {cards[activeIndex].text}
                    </Typography>

                    <div className="space-y-3">
                      {cards[activeIndex].details.map((detail, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Chip
                            icon={<span className="text-green-500">✓</span>}
                            label={detail}
                            variant="outlined"
                            sx={{
                              borderColor: darkMode ? "#22c55e" : "#10b981",
                              color: darkMode ? "#e2e8f0" : "#1e293b",
                              backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                              "& .MuiChip-icon": {
                                color: darkMode ? "#22c55e" : "#10b981",
                              }
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Controles de navegação */}
                <Box className="flex justify-between items-center mt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      startIcon={<ArrowBack />}
                      onClick={prevCard}
                      variant="outlined"
                      sx={{
                        color: darkMode ? "#e2e8f0" : "#475569",
                        borderColor: darkMode ? "#475569" : "#cbd5e1",
                        '&:hover': {
                          borderColor: darkMode ? "#22c55e" : "#10b981",
                          backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                        }
                      }}
                    >
                      Anterior
                    </Button>
                  </motion.div>

                  {/* Pontos de navegação */}
                  <Box className="flex gap-2">
                    {cards.map((_, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        <div
                          onClick={() => setActiveIndex(index)}
                          className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                            activeIndex === index
                              ? darkMode ? "bg-green-400 scale-125" : "bg-green-600 scale-125"
                              : darkMode ? "bg-slate-600 hover:bg-slate-500" : "bg-slate-300 hover:bg-slate-400"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </Box>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      endIcon={<ArrowForward />}
                      onClick={nextCard}
                      variant="outlined"
                      sx={{
                        color: darkMode ? "#e2e8f0" : "#475569",
                        borderColor: darkMode ? "#475569" : "#cbd5e1",
                        '&:hover': {
                          borderColor: darkMode ? "#22c55e" : "#10b981",
                          backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                        }
                      }}
                    >
                      Próximo
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Painel lateral */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
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
              <CardContent className="p-6">
                <Typography 
                  variant="h6" 
                  className={`font-bold mb-4 ${darkMode ? "text-green-400" : "text-green-700"}`}
                >
                  Índice Rápido
                </Typography>

                <div className="space-y-2">
                  {cards.map((card, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Button
                        fullWidth
                        startIcon={card.icon}
                        onClick={() => setActiveIndex(index)}
                        sx={{
                          justifyContent: "flex-start",
                          color: activeIndex === index 
                            ? darkMode ? "#22c55e" : "#10b981"
                            : darkMode ? "#e2e8f0" : "#475569",
                          backgroundColor: activeIndex === index
                            ? darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)"
                            : "transparent",
                          border: activeIndex === index
                            ? `1px solid ${darkMode ? "#22c55e" : "#10b981"}`
                            : `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                          '&:hover': {
                            backgroundColor: darkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(16, 185, 129, 0.15)",
                            borderColor: darkMode ? "#22c55e" : "#10b981",
                          }
                        }}
                      >
                        {card.title.replace(/[🔒🎯🛡️👥📊]/g, '').trim()}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <Divider sx={{ my: 4, opacity: 0.3 }} />

                {/* Ações rápidas */}
                <Typography 
                  variant="h6" 
                  className={`font-bold mb-3 ${darkMode ? "text-green-400" : "text-green-700"}`}
                >
                  Ações Rápidas
                </Typography>

                <div className="space-y-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      fullWidth
                      startIcon={<Download />}
                      variant="outlined"
                      sx={{
                        color: darkMode ? "#e2e8f0" : "#475569",
                        borderColor: darkMode ? "#475569" : "#cbd5e1",
                        '&:hover': {
                          borderColor: darkMode ? "#22c55e" : "#10b981",
                          backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                        }
                      }}
                    >
                      Baixar PDF
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      fullWidth
                      startIcon={<Mail />}
                      variant="outlined"
                      sx={{
                        color: darkMode ? "#e2e8f0" : "#475569",
                        borderColor: darkMode ? "#475569" : "#cbd5e1",
                        '&:hover': {
                          borderColor: darkMode ? "#22c55e" : "#10b981",
                          backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                        }
                      }}
                    >
                      Contatar DPO
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Seção de FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16"
        >
          <Typography 
            variant="h4" 
            className={`font-bold text-center mb-8 ${darkMode ? "text-green-400" : "text-green-700"}`}
          >
            Perguntas Frequentes
          </Typography>

          <div className="space-y-3">
            {[
              {
                question: "Como meus dados são protegidos?",
                answer: "Utilizamos criptografia de ponta a ponta, servidores seguros e seguimos as melhores práticas de segurança da informação."
              },
              {
                question: "Posso excluir meus dados?",
                answer: "Sim, você pode solicitar a exclusão completa dos seus dados a qualquer momento através das configurações do aplicativo."
              },
              {
                question: "Com quem meus dados são compartilhados?",
                answer: "Seus dados só são compartilhados com seu consentimento explícito e apenas com parceiros que seguem nossos padrões de segurança."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Accordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                  sx={{
                    background: darkMode ? "#1e293b" : "#ffffff",
                    border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    borderRadius: "12px !important",
                    '&:before': { display: 'none' },
                    mb: 2,
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography className={darkMode ? "text-slate-200" : "text-slate-800"}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={darkMode ? "text-slate-400" : "text-slate-600"}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-16 py-8"
        >
          <Card
            sx={{
              background: darkMode
                ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
              borderRadius: 3,
              padding: 4,
            }}
          >
            <Typography
              variant="h6"
              className={`mb-4 ${darkMode ? "text-slate-200" : "text-slate-800"}`}
            >
              Esta política de privacidade foi útil?
            </Typography>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => setLiked(!liked)}
                sx={{
                  backgroundColor: liked 
                    ? darkMode ? "rgba(34, 197, 94, 0.2)" : "rgba(16, 185, 129, 0.2)"
                    : darkMode ? "rgba(100, 116, 139, 0.2)" : "rgba(203, 213, 225, 0.5)",
                  color: liked 
                    ? darkMode ? "#22c55e" : "#10b981"
                    : darkMode ? "#94a3b8" : "#64748b",
                  width: 64,
                  height: 64,
                  '&:hover': {
                    backgroundColor: liked 
                      ? darkMode ? "rgba(34, 197, 94, 0.3)" : "rgba(16, 185, 129, 0.3)"
                      : darkMode ? "rgba(100, 116, 139, 0.3)" : "rgba(203, 213, 225, 0.7)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {liked ? <ThumbUpAlt sx={{ fontSize: 32 }} /> : <ThumbUpAltOutlined sx={{ fontSize: 32 }} />}
              </IconButton>
            </motion.div>

            <AnimatePresence>
              {liked && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Typography
                    variant="body2"
                    className="mt-3 text-green-600 font-medium"
                  >
                    Obrigado pelo seu feedback! 💚
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </Container>

      {/* FAB para voltar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="fixed bottom-6 left-6"
        style={{ zIndex: 9999 }}
      >
        <Tooltip title="Voltar para o aplicativo">
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