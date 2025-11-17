import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Share, WhatsApp, Facebook, Link as LinkIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Compartilhe() {
  return (
    <Box className="flex flex-col items-center justify-center h-screen bg-[#E8F5E9] text-center p-6">
      <Share className="text-green-700 mb-4" sx={{ fontSize: 60 }} />
      <Typography variant="h5" className="font-semibold text-green-800 mb-2">
        Compartilhe o MultiBus
      </Typography>
      <Typography variant="body1" className="text-gray-700 mb-6 max-w-md">
        Convide seus amigos para usar o MultiBus e facilitar o dia a dia no transporte público!
      </Typography>

      <div className="flex flex-wrap justify-center gap-4">
        <Button
          variant="contained"
          startIcon={<WhatsApp />}
          className="!bg-green-600 hover:!bg-green-700 text-white"
        >
          WhatsApp
        </Button>
        <Button
          variant="contained"
          startIcon={<Facebook />}
          className="!bg-blue-600 hover:!bg-blue-700 text-white"
        >
          Facebook
        </Button>
        <Button
          variant="outlined"
          startIcon={<LinkIcon />}
          className="border-green-700 text-green-700 hover:bg-green-50"
        >
          Copiar Link
        </Button>
      </div>
    </Box>
  );
}
