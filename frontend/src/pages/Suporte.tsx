import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { SupportAgent } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Suporte() {
  return (
    <Box className="flex flex-col items-center justify-center h-screen bg-[#E8F5E9] text-center p-6">
      <SupportAgent className="text-green-700 mb-4" sx={{ fontSize: 60 }} />
      <Typography variant="h5" className="font-semibold text-green-800 mb-2">
        Suporte ao Usuário
      </Typography>
      <Typography variant="body1" className="text-gray-700 mb-6 max-w-md">
        Descreva seu problema ou sugestão e entraremos em contato com você.
      </Typography>

      <Box className="w-full max-w-md flex flex-col gap-3">
        <TextField label="Seu nome" variant="outlined" fullWidth />
        <TextField label="E-mail" variant="outlined" fullWidth />
        <TextField
          label="Mensagem"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          className="!bg-green-600 hover:!bg-green-700 text-white"
        >
          Enviar Mensagem
        </Button>
      </Box>
    </Box>
  );
}
