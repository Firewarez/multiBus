import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Container,
  IconButton,
  Fab,
  Tooltip,
  TextField,
  Chip,
} from "@mui/material";
import {
  HelpOutline,
  ExpandMore,
  Search,
  ArrowBack,
  Brightness4,
  Brightness7,
  ContactSupport,
  School,
  Payment,
  Map,
  AccountCircle,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Ajuda() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState<string | false>(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqCategories = [
    {
      icon: <School sx={{ fontSize: 24 }} />,
      title: "Como Usar o App",
      color: "#3b82f6"
    },
    {
      icon: <Payment sx={{ fontSize: 24 }} />,
      title: "Pagamentos",
      color: "#10b981"
    },
    {
      icon: <Map sx={{ fontSize: 24 }} />,
      title: "Rotas e Mapas",
      color: "#f59e0b"
    },
    {
      icon: <AccountCircle sx={{ fontSize: 24 }} />,
      title: "Minha Conta",
      color: "#ef4444"
    }
  ];

  const faqItems = [
    {
      id: "como-funciona",
      question: "Como funciona o MultiBus?",
      answer: "O MultiBus é seu assistente pessoal de transporte público. Mostramos horários em tempo real, rotas otimizadas, pontos de recarga próximos e previsões de chegada para tornar seu deslocamento mais eficiente e tranquilo.",
      category: "Como Usar o App",
      icon: <School />
    },
    {
      id: "recarregar-cartao",
      question: "Como recarregar meu cartão?",
      answer: "Acesse o menu lateral e clique em 'Recarregar Cartões'. Você será redirecionado à área de pagamento segura onde pode escolher entre cartão de crédito, débito ou PIX. As recargas são processadas instantaneamente.",
      category: "Pagamentos",
      icon: <Payment />
    },
    {
      id: "contato-suporte",
      question: "Como entrar em contato com o suporte?",
      answer: "Vá até a seção 'Suporte' no menu lateral e preencha o formulário com sua mensagem. Nossa equipe responde em até 24 horas. Você também pode verificar as perguntas frequentes antes de entrar em contato.",
      category: "Minha Conta",
      icon: <AccountCircle />
    },
    {
      id: "rotas-tempo-real",
      question: "As rotas são em tempo real?",
      answer: "Sim! Utilizamos tecnologia GPS e dados das empresas de transporte para fornecer informações em tempo real sobre a localização dos ônibus, previsões de chegada e eventuais atrasos ou alterações nas rotas.",
      category: "Rotas e Mapas",
      icon: <Map />
    },
    {
      id: "pontos-recarga",
      question: "Onde encontro pontos de recarga?",
      answer: "No menu lateral, clique em 'Pontos de Recarga'. O mapa mostrará todos os pontos próximos a você, com horários de funcionamento e tipos de cartão aceitos em cada local.",
      category: "Rotas e Mapas",
      icon: <Map />
    },
    {
      id: "editar-perfil",
      question: "Como editar minhas informações?",
      answer: "Acesse 'Editar Perfil' no menu lateral. Lá você pode atualizar seu nome, e-mail, telefone e outras informações pessoais. Todas as alterações são salvas automaticamente.",
      category: "Minha Conta",
      icon: <AccountCircle />
    },
    {
      id: "problemas-pagamento",
      question: "E se tiver problemas com pagamento?",
      answer: "Caso enfrente problemas com pagamentos, verifique primeiro os dados do cartão e a conexão com a internet. Se o problema persistir, entre em contato conosco pelo suporte e nossa equipe resolverá rapidamente.",
      category: "Pagamentos",
      icon: <Payment />
    },
    {
      id: "notificacoes",
      question: "Como funcionam as notificações?",
      answer: "Enviamos notificações sobre atrasos, alterações de rota, promoções e lembretes importantes. Você pode personalizar quais notificações deseja receber nas configurações do aplicativo.",
      category: "Como Usar o App",
      icon: <School />
    }
  ];

  const filteredFaqItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const cat = faqCategories.find(c => c.title === category);
    return cat ? cat.color : "#6b7280";
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

        {/* Conteúdo principal */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Coluna lateral - Categorias */}
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
                  📚 Categorias
                </Typography>

                <div className="space-y-3">
                  {faqCategories.map((category, index) => (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-opacity-10 hover:bg-opacity-20 transition-all cursor-pointer"
                        style={{ 
                          backgroundColor: category.color + '20',
                          border: `1px solid ${category.color}30`
                        }}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: category.color }}>
                          {category.icon}
                        </div>
                        <Typography 
                          variant="body2" 
                          className="font-semibold"
                          sx={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}
                        >
                          {category.title}
                        </Typography>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                  <Typography 
                    variant="body2" 
                    className="text-center font-semibold mb-2"
                    sx={{ color: darkMode ? '#22c55e' : '#059669' }}
                  >
                    Não encontrou o que procura?
                  </Typography>
                  <Typography 
                    variant="caption" 
                    className="text-center block"
                    sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                  >
                    Entre em contato com nosso suporte
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Coluna principal - FAQ */}
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
                    <HelpOutline sx={{ 
                      fontSize: 64, 
                      color: darkMode ? "#22c55e" : "#10b981" 
                    }} />
                  </motion.div>
                  
                  <Typography
                    variant="h3"
                    className={`font-bold mb-3 ${darkMode ? "text-green-300" : "text-green-700"}`}
                  >
                    Central de Ajuda
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    className={darkMode ? "text-slate-300" : "text-slate-600"}
                  >
                    Encontre respostas para as dúvidas mais frequentes
                  </Typography>
                </div>

                {/* Barra de pesquisa */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <TextField
                    fullWidth
                    placeholder="Pesquisar na central de ajuda..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <Search sx={{ color: darkMode ? "#94a3b8" : "#64748b", mr: 1 }} />
                      ),
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

                {/* Lista de FAQ */}
                <div className="space-y-4">
                  {filteredFaqItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Accordion
                        expanded={expanded === item.id}
                        onChange={handleAccordionChange(item.id)}
                        sx={{
                          background: darkMode
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.8)",
                          border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                          borderRadius: '12px !important',
                          '&:before': { display: 'none' },
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          overflow: 'hidden',
                        }}
                      >
                        <AccordionSummary 
                          expandIcon={<ExpandMore />}
                          sx={{
                            '& .MuiAccordionSummary-content': {
                              alignItems: 'center',
                              gap: 2,
                            }
                          }}
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: getCategoryColor(item.category) }}>
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <Typography 
                              variant="h6" 
                              className={`font-semibold ${darkMode ? "text-slate-200" : "text-slate-800"}`}
                            >
                              {item.question}
                            </Typography>
                            <Chip
                              label={item.category}
                              size="small"
                              sx={{
                                backgroundColor: getCategoryColor(item.category) + '20',
                                color: getCategoryColor(item.category),
                                fontSize: '0.7rem',
                                height: 20,
                              }}
                            />
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography 
                            variant="body1" 
                            className={darkMode ? "text-slate-300" : "text-slate-700"}
                            sx={{ lineHeight: 1.6 }}
                          >
                            {item.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </motion.div>
                  ))}
                </div>

                {/* Mensagem quando não há resultados */}
                {filteredFaqItems.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <ContactSupport sx={{ 
                      fontSize: 64, 
                      color: darkMode ? "#94a3b8" : "#cbd5e1",
                      mb: 2 
                    }} />
                    <Typography 
                      variant="h6" 
                      className={darkMode ? "text-slate-400" : "text-slate-500"}
                    >
                      Nenhum resultado encontrado para "{searchTerm}"
                    </Typography>
                    <Typography 
                      variant="body2" 
                      className={darkMode ? "text-slate-500" : "text-slate-400"}
                    >
                      Tente usar outras palavras-chave ou entre em contato com o suporte
                    </Typography>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>

      {/* FAB para voltar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
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