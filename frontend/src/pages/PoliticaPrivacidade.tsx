import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  ThumbUpAltOutlined,
  ThumbUpAlt,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

export default function PoliticaPrivacidade() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const cards = [
    {
      title: "1️⃣ Coleta de Dados",
      text: `O MultiBus coleta apenas informações essenciais como nome, email e localização aproximada. 
Esses dados são usados para personalizar sua experiência e melhorar os serviços oferecidos, 
como exibir linhas próximas e rotas mais relevantes.`,
    },
    {
      title: "2️⃣ Uso das Informações",
      text: `Utilizamos seus dados para otimizar a navegação e apresentar sugestões personalizadas. 
O MultiBus nunca compartilha suas informações pessoais com terceiros, 
e todas as comunicações são realizadas de forma segura e transparente.`,
    },
    {
      title: "3️⃣ Segurança e Privacidade",
      text: `Empregamos criptografia e autenticação segura para proteger seus dados. 
Você pode solicitar a exclusão das suas informações a qualquer momento. 
Nosso compromisso é manter sua confiança e garantir sua privacidade.`,
    },
  ];

  // Barra de progresso fixa em 33%, 66% e 100%
  const progressSteps = [33, 66, 100];
  const progress = progressSteps[activeIndex];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#1b1b1b" : "#ffffff",
        color: darkMode ? "#f5f5f5" : "#1b1b1b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 8,
        transition: "all 0.3s ease",
      }}
    >
      {/* Cabeçalho */}
      <Box className="flex items-center justify-between w-full max-w-3xl mb-8">
        <Typography
          variant="h4"
          className={`font-bold ${
            darkMode ? "text-green-200" : "text-green-700"
          }`}
        >
          Política de Privacidade
        </Typography>

        <IconButton onClick={toggleDarkMode}>
          {darkMode ? (
            <Brightness7 className="text-yellow-400" />
          ) : (
            <Brightness4 className="text-gray-700" />
          )}
        </IconButton>
      </Box>

      {/* Indicador de progresso */}
      <Box className="w-full max-w-3xl mb-6">
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: darkMode ? "#333" : "#E0E0E0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#22c55e", // Verde igual ao Home
              borderRadius: 5,
            },
          }}
        />
        <Typography
          variant="body2"
          align="right"
          className="mt-1 text-sm text-gray-500"
        >
          {progress}% concluído
        </Typography>
      </Box>

      {/* Card animado */}
      <Box className="relative w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className="shadow-xl rounded-2xl transition-all duration-500 ease-in-out"
              sx={{
                backgroundColor: "#22c55e", // Verde do Home
                color: "#fff",
                minHeight: "360px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 5,
              }}
            >
              <CardContent>
                <Typography variant="h5" className="font-semibold mb-4 text-white">
                  {cards[activeIndex].title}
                </Typography>
                <Typography
                  variant="body1"
                  className="leading-relaxed text-white text-lg"
                  sx={{ lineHeight: 1.8 }}
                >
                  {cards[activeIndex].text}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Pontos de navegação */}
        <Box className="flex justify-center mt-6 gap-2">
          {cards.map((_, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer w-4 h-4 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-green-600 scale-125"
                  : "bg-gray-300 hover:bg-green-400"
              }`}
            ></div>
          ))}
        </Box>
      </Box>

      {/* Feedback */}
      <Box className="flex flex-col items-center mt-10">
        <Typography
          variant="body1"
          className={`mb-3 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } text-center`}
        >
          Essa política de privacidade foi útil?
        </Typography>
        <IconButton
          onClick={() => setLiked(!liked)}
          sx={{
            backgroundColor: liked ? "#4CAF50" : "#E0E0E0",
            color: liked ? "white" : "#4CAF50",
            "&:hover": {
              backgroundColor: liked ? "#43A047" : "#C8E6C9",
            },
            transition: "all 0.3s ease",
          }}
        >
          {liked ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
        </IconButton>
        {liked && (
          <Typography
            variant="body2"
            className="mt-2 text-green-600 font-medium"
          >
            Obrigado pelo seu feedback! 💚
          </Typography>
        )}
      </Box>
    </Box>
  );
}
