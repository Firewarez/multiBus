import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  IconButton,
  Fab,
  Tooltip,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import {
  Gavel,
  ArrowBack,
  Brightness4,
  Brightness7,
  CheckCircle,
  Warning,
  Security,
  Description,
  Download,
  ThumbUp,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TermosUso() {
  const [darkMode, setDarkMode] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const termsSections = [
    {
      icon: <Description sx={{ fontSize: 24 }} />,
      title: "1. Aceitação dos Termos",
      content: "Ao utilizar o MultiBus, você concorda integralmente com estes Termos de Uso e com nossa Política de Privacidade. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso aplicativo.",
      color: "#3b82f6"
    },
    {
      icon: <Security sx={{ fontSize: 24 }} />,
      title: "2. Uso do Serviço",
      content: "O MultiBus fornece informações de transporte público com o objetivo de facilitar o deslocamento urbano. O serviço inclui previsões de horários, rotas, pontos de recarga e outras funcionalidades relacionadas ao transporte público.",
      color: "#10b981"
    },
    {
      icon: <Warning sx={{ fontSize: 24 }} />,
      title: "3. Limitações de Responsabilidade",
      content: "Não nos responsabilizamos por eventuais divergências de horários, alterações de rotas ou quaisquer outras informações fornecidas pelas empresas operadoras de transporte. As informações são fornecidas 'como estão' e podem estar sujeitas a alterações sem aviso prévio.",
      color: "#f59e0b"
    },
    {
      icon: <Security sx={{ fontSize: 24 }} />,
      title: "4. Proteção de Dados",
      content: "As informações pessoais coletadas são utilizadas exclusivamente para melhorar a experiência do usuário e fornecer os serviços contratados, seguindo rigorosamente a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).",
      color: "#ef4444"
    },
    {
      icon: <Warning sx={{ fontSize: 24 }} />,
      title: "5. Conduta do Usuário",
      content: "É proibido o uso indevido do aplicativo, incluindo tentativas de invasão, falsificação de dados, acesso não autorizado ou qualquer atividade que possa prejudicar o funcionamento do serviço ou a experiência de outros usuários.",
      color: "#8b5cf6"
    },
    {
      icon: <Gavel sx={{ fontSize: 24 }} />,
      title: "6. Propriedade Intelectual",
      content: "Todo o conteúdo, marcas, logotipos e software presentes no MultiBus são de propriedade exclusiva da empresa e estão protegidos pelas leis de propriedade intelectual. É proibida a reprodução não autorizada.",
      color: "#06b6d4"
    },
    {
      icon: <Description sx={{ fontSize: 24 }} />,
      title: "7. Modificações nos Termos",
      content: "Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no aplicativo. O uso continuado do serviço constitui aceitação das modificações.",
      color: "#f97316"
    },
    {
      icon: <Security sx={{ fontSize: 24 }} />,
      title: "8. Disposições Gerais",
      content: "Estes Termos constituem o acordo completo entre as partes. Caso qualquer disposição seja considerada inválida, as demais permanecerão em pleno vigor. Estes Termos são regidos pelas leis da República Federativa do Brasil.",
      color: "#84cc16"
    }
  ];

  const keyPoints = [
    "Uso pessoal e não comercial",
    "Idade mínima: 16 anos",
    "Dados protegidos pela LGPD",
    "Responsabilidade do usuário",
    "Propriedade intelectual reservada",
    "Direito de modificar termos"
  ];

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

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 4 }}>
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

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Coluna lateral - Resumo */}
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
              <CardContent className="p-6">
                <Typography 
                  variant="h6" 
                  className={`font-bold mb-4 ${darkMode ? "text-green-400" : "text-green-700"}`}
                >
                  📋 Resumo
                </Typography>

                <div className="space-y-3 mb-6">
                  {keyPoints.map((point, index) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle sx={{ 
                        fontSize: 16, 
                        color: darkMode ? "#22c55e" : "#10b981" 
                      }} />
                      <Typography 
                        variant="body2"
                        className={darkMode ? "text-slate-300" : "text-slate-700"}
                      >
                        {point}
                      </Typography>
                    </motion.div>
                  ))}
                </div>

                <Divider sx={{ my: 3, opacity: 0.3 }} />

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
                      startIcon={<ThumbUp />}
                      variant={accepted ? "contained" : "outlined"}
                      onClick={() => setAccepted(!accepted)}
                      sx={{
                        background: accepted 
                          ? (darkMode 
                              ? "linear-gradient(135deg, #059669 0%, #047857 100%)" 
                              : "linear-gradient(135deg, #10b981 0%, #059669 100%)")
                          : 'transparent',
                        color: accepted ? 'white' : (darkMode ? "#e2e8f0" : "#475569"),
                        borderColor: darkMode ? "#475569" : "#cbd5e1",
                        '&:hover': {
                          borderColor: darkMode ? "#22c55e" : "#10b981",
                          backgroundColor: accepted 
                            ? (darkMode 
                                ? "linear-gradient(135deg, #047857 0%, #065f46 100%)" 
                                : "linear-gradient(135deg, #059669 0%, #047857 100%)")
                            : (darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)"),
                        }
                      }}
                    >
                      {accepted ? "Termos Aceitos" : "Aceitar Termos"}
                    </Button>
                  </motion.div>
                </div>

                {accepted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                  >
                    <Typography 
                      variant="caption" 
                      className="text-green-600 font-semibold text-center block"
                    >
                      ✅ Termos aceitos com sucesso!
                    </Typography>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Coluna principal - Termos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-3"
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
                    <Gavel sx={{ 
                      fontSize: 64, 
                      color: darkMode ? "#22c55e" : "#10b981" 
                    }} />
                  </motion.div>
                  
                  <Typography
                    variant="h3"
                    className={`font-bold mb-3 ${darkMode ? "text-green-300" : "text-green-700"}`}
                  >
                    Termos de Uso
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    className={darkMode ? "text-slate-300" : "text-slate-600"}
                  >
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                  </Typography>

                  <Chip
                    label="Leia atentamente antes de usar o aplicativo"
                    variant="outlined"
                    sx={{
                      borderColor: darkMode ? "#22c55e" : "#10b981",
                      color: darkMode ? "#22c55e" : "#10b981",
                      backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                      mt: 2,
                      fontWeight: 'bold'
                    }}
                  />
                </div>

                {/* Introdução */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 p-6 rounded-lg bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20"
                >
                  <Typography 
                    variant="body1" 
                    className={`font-semibold text-center ${darkMode ? "text-slate-200" : "text-slate-800"}`}
                    sx={{ lineHeight: 1.6 }}
                  >
                    Ao utilizar o MultiBus, você concorda com os seguintes termos e condições de uso. 
                    Estes termos estabelecem os direitos e responsabilidades de todos os usuários do nosso aplicativo.
                  </Typography>
                </motion.div>

                {/* Seções dos Termos */}
                <div className="space-y-6">
                  {termsSections.map((section, index) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Card
                        sx={{
                          background: darkMode
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                          border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                              style={{ backgroundColor: section.color }}
                            >
                              {section.icon}
                            </div>
                            <div>
                              <Typography
                                variant="h6"
                                className={`font-bold mb-2 ${darkMode ? "text-slate-200" : "text-slate-800"}`}
                              >
                                {section.title}
                              </Typography>
                              <Typography
                                variant="body1"
                                className={darkMode ? "text-slate-300" : "text-slate-700"}
                                sx={{ lineHeight: 1.6 }}
                              >
                                {section.content}
                              </Typography>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Rodapé */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8 p-6 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 text-center"
                >
                  <Typography 
                    variant="body1" 
                    className={`font-semibold mb-2 ${darkMode ? "text-slate-200" : "text-slate-800"}`}
                  >
                    📞 Dúvidas sobre estes termos?
                  </Typography>
                  <Typography 
                    variant="body2" 
                    className={darkMode ? "text-slate-400" : "text-slate-600"}
                  >
                    Entre em contato conosco através da seção de Suporte no aplicativo
                  </Typography>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>

      {/* FAB para voltar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
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
    </Box>
  );
}