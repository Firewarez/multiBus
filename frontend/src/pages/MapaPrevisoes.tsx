import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import { LocationOn, Close, DirectionsBus } from "@mui/icons-material";

interface Parada {
  id: number;
  nome: string;
  lat: number;
  lng: number;
  linhas: {
    nome: string;
    proximoEm: number; // minutos até o próximo
    proximos: { ativo: boolean; minutos: number }[];
  }[];
}

interface ParadaMarkerProps {
  lat?: number;
  lng?: number;
  onClick: () => void;
}

const ParadaMarker = ({ onClick }: ParadaMarkerProps) => (
  <IconButton
    onClick={onClick}
    sx={{
      color: "#22c55e",
      backgroundColor: "white",
      borderRadius: "50%",
      boxShadow: 2,
      "&:hover": { backgroundColor: "#dcfce7" },
    }}
  >
    <LocationOn fontSize="large" />
  </IconButton>
);

export default function MapaPrevisoes() {
  const [selectedParada, setSelectedParada] = useState<Parada | null>(null);

  const paradas: Parada[] = [
    {
      id: 1,
      nome: "Parada Av. Epitácio Pessoa",
      lat: -7.119495,
      lng: -34.845011,
      linhas: [
        {
          nome: "101 - Tambaú",
          proximoEm: 5,
          proximos: [
            { ativo: true, minutos: 5 },
            { ativo: true, minutos: 15 },
            { ativo: false, minutos: 30 },
          ],
        },
        {
          nome: "1500 - Circular",
          proximoEm: 10,
          proximos: [
            { ativo: true, minutos: 10 },
            { ativo: false, minutos: 25 },
            { ativo: false, minutos: 40 },
          ],
        },
        {
          nome: "507 - Cabo Branco",
          proximoEm: 8,
          proximos: [
            { ativo: true, minutos: 8 },
            { ativo: true, minutos: 18 },
            { ativo: false, minutos: 35 },
          ],
        },
      ],
    },
    {
      id: 2,
      nome: "Terminal de Integração",
      lat: -7.125,
      lng: -34.845,
      linhas: [
        {
          nome: "301 - Mangabeira",
          proximoEm: 3,
          proximos: [
            { ativo: true, minutos: 3 },
            { ativo: true, minutos: 13 },
            { ativo: true, minutos: 25 },
          ],
        },
        {
          nome: "602 - Bessa",
          proximoEm: 12,
          proximos: [
            { ativo: true, minutos: 12 },
            { ativo: false, minutos: 28 },
            { ativo: false, minutos: 40 },
          ],
        },
        {
          nome: "204 - Alto do Mateus",
          proximoEm: 6,
          proximos: [
            { ativo: true, minutos: 6 },
            { ativo: true, minutos: 17 },
            { ativo: false, minutos: 33 },
          ],
        },
      ],
    },
  ];

  const center = { lat: -7.12, lng: -34.84 };

  return (
    <div className="relative w-full h-screen bg-gray-100 dark:bg-gray-900">
      {/* Título */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-green-600 text-white px-6 py-2 rounded-full shadow-lg">
        <h1 className="text-lg font-semibold">Mapa de Previsões</h1>
      </div>

      {/* Google Map */}
      <div className="h-full w-full">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "SUA_CHAVE_DO_GOOGLE_MAPS_AQUI",
          }}
          defaultCenter={center}
          defaultZoom={14}
        >
          {paradas.map((p) => (
            <ParadaMarker
              key={p.id}
              lat={p.lat}
              lng={p.lng}
              onClick={() => setSelectedParada(p)}
            />
          ))}
        </GoogleMapReact>
      </div>

      {/* Modal das Linhas */}
      <Dialog
        open={!!selectedParada}
        onClose={() => setSelectedParada(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            backgroundColor: "#22c55e",
            color: "white",
            padding: "10px",
          },
        }}
      >
        <DialogTitle className="flex justify-between items-center">
          <span className="text-xl font-bold">{selectedParada?.nome}</span>
          <IconButton
            onClick={() => setSelectedParada(null)}
            sx={{ color: "white" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Typography variant="h6" className="text-white mb-3 font-semibold">
            Linhas que passam nesta parada:
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {selectedParada?.linhas.map((linha, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  padding: "12px",
                  boxShadow: 2,
                }}
              >
                <Typography variant="subtitle1" className="font-bold mb-1">
                  <DirectionsBus sx={{ mr: 1, verticalAlign: "middle" }} />
                  {linha.nome}
                </Typography>
                <Typography variant="body2" className="mb-2">
                  🕒 Próximo em{" "}
                  <span className="font-semibold">{linha.proximoEm} min</span>
                </Typography>
                <Box display="flex" gap={1}>
                  {linha.proximos.map((prox, j) => (
                    <Chip
                      key={j}
                      label={
                        prox.ativo
                          ? `${prox.minutos} min`
                          : `${prox.minutos} min (inativo)`
                      }
                      sx={{
                        backgroundColor: prox.ativo
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.3)",
                        color: prox.ativo ? "#166534" : "#9ca3af",
                        fontWeight: "bold",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
