import React from "react";
import { Box, Typography } from "@mui/material";
import { Gavel } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function TermosUso() {
  return (
    <Box className="flex flex-col items-center justify-start min-h-screen bg-[#E8F5E9] text-justify p-6">
      <div className="text-center mb-4">
        <Gavel className="text-green-700 mb-2" sx={{ fontSize: 60 }} />
        <Typography variant="h5" className="font-semibold text-green-800">
          Termos de Uso
        </Typography>
      </div>

      <Box className="max-w-3xl bg-white p-6 rounded-lg shadow">
        <Typography variant="body1" paragraph>
          Ao utilizar o MultiBus, você concorda com os seguintes termos e condições de uso.
        </Typography>
        <Typography variant="body1" paragraph>
          O MultiBus fornece informações de transporte público com o objetivo de facilitar o deslocamento urbano. 
          Não nos responsabilizamos por eventuais divergências de horários ou rotas fornecidas pelas empresas operadoras.
        </Typography>
        <Typography variant="body1" paragraph>
          As informações pessoais coletadas são utilizadas apenas para melhorar a experiência do usuário, 
          seguindo rigorosamente a Lei Geral de Proteção de Dados (LGPD).
        </Typography>
        <Typography variant="body1" paragraph>
          O uso indevido do aplicativo, incluindo tentativas de invasão ou falsificação de dados, 
          poderá resultar em bloqueio de acesso e medidas legais cabíveis.
        </Typography>
      </Box>
    </Box>
  );
}
