import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { HelpOutline, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Ajuda() {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-[#E8F5E9] p-6">
      <HelpOutline className="text-green-700 mb-4" sx={{ fontSize: 60 }} />
      <Typography variant="h5" className="font-semibold text-green-800 mb-4">
        Central de Ajuda
      </Typography>

      <Box className="w-full max-w-2xl">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Como funciona o MultiBus?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              O MultiBus mostra horários, rotas e pontos de recarga em tempo real para facilitar o transporte público.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Como recarregar meu cartão?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Acesse o menu lateral e clique em “Recarregar Cartões”. Você será redirecionado à área de pagamento.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Como entrar em contato com o suporte?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Vá até a seção “Suporte” no menu e preencha o formulário com sua mensagem.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
