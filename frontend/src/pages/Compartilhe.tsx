import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Snackbar,
  Alert,
  Chip,
  Fab,
  Tooltip,
} from "@mui/material";
import {
  Share,
  WhatsApp,
  Facebook,
  Twitter,
  Link as LinkIcon,
  ContentCopy,
  CheckCircle,
  Groups,
  ArrowBack,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

/**
 * Componente Compartilhe - Tela de compartilhamento do aplicativo MultiBus
 * 
 * Esta tela permite que usuários compartilhem o aplicativo através de diversas
 * plataformas sociais, com suporte a tema escuro/claro e animações fluidas.
 * 
 * Principais funcionalidades:
 * - Compartilhamento via WhatsApp, Facebook e Twitter
 * - Cópia de link para área de transferência
 * - Alternância entre temas claro/escuro
 * - Estatísticas de compartilhamento
 * - Animações com Framer Motion
 * 
 * @returns {JSX.Element} Componente de tela de compartilhamento
 */
export default function Compartilhe() {
  // ================ ESTADOS E HOOKS ================
  
  // Contexto de tema para gerenciar modo escuro/claro
  const { darkMode, toggleDarkMode } = useTheme();
  
  // Estado para controle da notificação de cópia bem-sucedida
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Estado para contador de compartilhamentos (poderia vir de API)
  const [shareCount, setShareCount] = useState(128);
  
  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // ================ LINKS DE COMPARTILHAMENTO ================
  
  /**
   * URLs pré-formatadas para compartilhamento em redes sociais
   * Incluem texto otimizado e encoding adequado para URLs
   */
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      "Confira o MultiBus - Seu transporte inteligente! 🚌✨ Acesse: https://multibus.app"
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://multibus.app"
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      "Descobri o MultiBus - App incrível para transporte público! 🚍 https://multibus.app"
    )}`,
  };

  // ================ FUNÇÕES DE MANIPULAÇÃO ================
  
  /**
   * Copia o link do aplicativo para a área de transferência
   * Exibe feedback visual através de Snackbar
   */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://multi-bus-develop.vercel.app/");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error('Falha ao copiar link: ', err);
    }
  };

  // ================ OPÇÕES DE COMPARTILHAMENTO ================
  
  /**
   * Array de opções de compartilhamento disponíveis
   * Cada objeto contém:
   * - name: Nome da plataforma
   * - icon: Ícone correspondente
   * - color: Gradiente de cores (adaptado ao tema)
   * - description: Texto descritivo
   * - action: Função a ser executada ao clicar
   */
  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <WhatsApp sx={{ fontSize: 28 }} />,
      color: darkMode 
        ? "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" 
        : "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
      description: "Compartilhe com seus contatos",
      action: () => window.open(shareLinks.whatsapp, '_blank')
    },
    {
      name: "Facebook",
      icon: <Facebook sx={{ fontSize: 28 }} />,
      color: darkMode 
        ? "linear-gradient(135deg, #1877F2 0%, #0D5CB6 100%)" 
        : "linear-gradient(135deg, #1877F2 0%, #0D5CB6 100%)",
      description: "Compartilhe na sua rede",
      action: () => window.open(shareLinks.facebook, '_blank')
    },
    {
      name: "Twitter",
      icon: <Twitter sx={{ fontSize: 28 }} />,
      color: darkMode 
        ? "linear-gradient(135deg, #1DA1F2 0%, #0D8BD9 100%)" 
        : "linear-gradient(135deg, #1DA1F2 0%, #0D8BD9 100%)",
      description: "Compartilhe no Twitter",
      action: () => window.open(shareLinks.twitter, '_blank')
    },
    {
      name: "Copiar Link",
      icon: copySuccess ? <CheckCircle sx={{ fontSize: 28 }} /> : <ContentCopy sx={{ fontSize: 28 }} />,
      color: darkMode 
        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
        : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      description: "Cole onde quiser",
      action: handleCopyLink
    }
  ];

  // ================ RENDERIZAÇÃO ================
  
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
      {/* ========== BACKGROUND DECORATIVO ========== */}
      
      {/* Gradiente de fundo para efeito visual */}
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

      {/* ========== CONTEÚDO PRINCIPAL ========== */}
      
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        
        {/* ----- HEADER COM BOTÃO DE TEMA ----- */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-12"
        >
          {/* Espaço reservado para possível logo ou menu */}
          <div></div>
          
          {/* Botão para alternar entre modo claro/escuro */}
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

        {/* ----- SEÇÃO DE APRESENTAÇÃO ----- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Ícone de compartilhamento animado */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mb-4"
          >
            <Share sx={{ 
              fontSize: 80, 
              color: darkMode ? "#22c55e" : "#10b981" 
            }} />
          </motion.div>
          
          {/* Título principal */}
          <Typography
            variant="h2"
            className={`font-bold mb-3 ${darkMode ? "text-green-300" : "text-green-700"}`}
          >
            Compartilhe o MultiBus
          </Typography>
          
          {/* Subtítulo descritivo */}
          <Typography
            variant="h6"
            className={darkMode ? "text-slate-300" : "text-slate-600"}
            sx={{ maxWidth: 600, margin: '0 auto', mb: 3 }}
          >
            Ajude seus amigos a descobrirem uma forma mais inteligente de se locomover
          </Typography>

          {/* ----- ESTATÍSTICAS ----- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-6"
          >
            {/* Card de compartilhamentos */}
            <Card
              sx={{
                background: darkMode 
                  ? "rgba(255, 255, 255, 0.05)" 
                  : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                borderRadius: 3,
                px: 3,
                py: 2,
              }}
            >
              <div className="text-center">
                <Typography 
                  variant="h4" 
                  className={`font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}
                >
                  {shareCount}+
                </Typography>
                <Typography 
                  variant="caption" 
                  className={darkMode ? "text-slate-400" : "text-slate-600"}
                >
                  Compartilhamentos
                </Typography>
              </div>
            </Card>

            {/* Card de usuários ativos */}
            <Card
              sx={{
                background: darkMode 
                  ? "rgba(255, 255, 255, 0.05)" 
                  : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                borderRadius: 3,
                px: 3,
                py: 2,
              }}
            >
              <div className="text-center">
                <Typography 
                  variant="h4" 
                  className={`font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}
                >
                  5K+
                </Typography>
                <Typography 
                  variant="caption" 
                  className={darkMode ? "text-slate-400" : "text-slate-600"}
                >
                  Usuários Ativos
                </Typography>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* ----- OPÇÕES DE COMPARTILHAMENTO ----- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <Typography 
            variant="h4" 
            className={`font-bold text-center mb-6 ${darkMode ? "text-green-400" : "text-green-700"}`}
          >
            Escolha como compartilhar
          </Typography>

          {/* Grid de opções de compartilhamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shareOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  sx={{
                    background: darkMode
                      ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                      : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 28px 0 rgba(0,0,0,0.2)',
                    }
                  }}
                  onClick={option.action}
                >
                  <CardContent className="p-4 text-center">
                    {/* Ícone circular com gradiente */}
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 text-white"
                      style={{ background: option.color }}
                    >
                      {option.icon}
                    </div>
                    
                    {/* Nome da opção */}
                    <Typography 
                      variant="h6" 
                      className={`font-bold mb-1 ${darkMode ? "text-slate-200" : "text-slate-800"}`}
                    >
                      {option.name}
                    </Typography>
                    
                    {/* Descrição */}
                    <Typography 
                      variant="body2" 
                      className={darkMode ? "text-slate-400" : "text-slate-600"}
                    >
                      {option.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ----- MENSAGEM DE CONVITE ----- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card
            sx={{
              background: darkMode
                ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
              borderRadius: 3,
            }}
          >
            <CardContent className="p-4 text-center">
              {/* Ícone de grupo */}
              <Groups sx={{ 
                fontSize: 40, 
                color: darkMode ? "#22c55e" : "#10b981",
                marginBottom: 2 
              }} />
              
              {/* Título convidativo */}
              <Typography 
                variant="h5" 
                className={`font-bold mb-3 ${darkMode ? "text-green-400" : "text-green-700"}`} 
              >
                Espalhe a Novidade!
              </Typography>
              
              {/* Mensagem motivacional */}
              <Typography 
                variant="body1" 
                className={darkMode ? "text-slate-300" : "text-slate-700"}
                sx={{ marginBottom: 2 }}
              >
                Cada compartilhamento ajuda mais pessoas a descobrirem uma forma 
                mais inteligente e eficiente de usar o transporte público.
              </Typography>

              {/* Chip com mensagem inspiradora */}
              <Chip
                icon={<Share />}
                label="Juntos podemos transformar a mobilidade urbana"
                variant="outlined"
                sx={{
                  borderColor: darkMode ? "#22c55e" : "#10b981",
                  color: darkMode ? "#22c55e" : "#10b981",
                  backgroundColor: darkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(16, 185, 129, 0.1)",
                  fontSize: '0.9rem',
                  padding: 1.5,
                }}
              />
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* ========== BOTÃO FLUTUANTE VOLTAR ========== */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
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

      {/* ========== SNACKBAR DE CONFIRMAÇÃO ========== */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess(false)}
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
          Link copiado para a área de transferência!
        </Alert>
      </Snackbar>
    </Box>
  );
}