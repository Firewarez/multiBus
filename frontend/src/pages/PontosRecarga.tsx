import React, { useEffect, useState } from "react";
import { Star, StarOff, MapPin, Navigation, X } from "lucide-react";

export default function PontosRecarga() {
  const [bairroFiltro, setBairroFiltro] = useState("");
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [localizacao, setLocalizacao] = useState<{ lat: number; lng: number } | null>(null);
  const [modalPonto, setModalPonto] = useState<any>(null);

  // LISTA DE PONTOS DE RECARGA
  const pontos = [
    { id: "1", nome: "Terminal Integração Sul", bairro: "Valentina", endereco: "Av. Mariangela Lucena Peixoto", lat: -7.20, lng: -34.84 },
    { id: "2", nome: "Shopping Sul", bairro: "Bancários", endereco: "Rua Comerciante 88", lat: -7.14, lng: -34.84 },
    { id: "3", nome: "Estação Cabo Branco", bairro: "Altiplano", endereco: "Av. Cabo Branco, 200", lat: -7.12, lng: -34.80 },
    { id: "4", nome: "Terminal Integração Oeste", bairro: "Oitizeiro", endereco: "Rua Oitizeiro, 55", lat: -7.18, lng: -34.87 },
    { id: "5", nome: "Praça da Paz", bairro: "Miramar", endereco: "Praça Central", lat: -7.14, lng: -34.82 },
    { id: "6", nome: "Liv Mall", bairro: "Brisamar", endereco: "Av. Rui Carneiro, 500", lat: -7.16, lng: -34.84 },
    { id: "7", nome: "Mercado Central", bairro: "Centro", endereco: "Rua das Palmeiras, 33", lat: -7.13, lng: -34.83 },
    { id: "8", nome: "Bessa Shopping", bairro: "Bessa", endereco: "Av. Oceânica, 901", lat: -7.11, lng: -34.79 },
    { id: "9", nome: "Integração Varadouro", bairro: "Varadouro", endereco: "Terminal Varadouro", lat: -7.17, lng: -34.86 },
    { id: "10", nome: "Posto Bessa", bairro: "Bessa", endereco: "Av. Governador Argemiro, 210", lat: -7.12, lng: -34.80 },
  ];

  // CAPTURAR LOCALIZAÇÃO DO USUÁRIO
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocalizacao({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => console.log("Usuário não permitiu acesso à localização")
    );
  }, []);

  // CALCULAR DISTÂNCIA ENTRE DOIS PONTOS (Haversine)
  const calcularDistancia = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // FAVORITAR / DESFAVORITAR
  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // ABRIR ROTA NO GOOGLE MAPS
  const abrirRota = (lat: number, lng: number) => {
    if (localizacao) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${localizacao.lat},${localizacao.lng}&destination=${lat},${lng}&travelmode=driving`;
      window.open(url, "_blank");
    } else {
      alert("Não foi possível obter sua localização.");
    }
  };

  // FILTRAR POR BAIRRO
  let pontosFiltrados = bairroFiltro
    ? pontos.filter((p) => p.bairro.toLowerCase().includes(bairroFiltro.toLowerCase()))
    : pontos;

  // COLOCAR FAVORITOS NO TOPO
  pontosFiltrados.sort((a, b) => {
    if (favoritos.includes(a.id) && !favoritos.includes(b.id)) return -1;
    if (!favoritos.includes(a.id) && favoritos.includes(b.id)) return 1;
    return 0;
  });

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Pontos de Recarga</h1>

      {/* FILTRO */}
      <input
        type="text"
        placeholder="Filtrar por bairro..."
        className="w-full mb-6 p-3 rounded-xl border border-gray-300 shadow-sm"
        value={bairroFiltro}
        onChange={(e) => setBairroFiltro(e.target.value)}
      />

      {/* GRID DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pontosFiltrados.map((p) => {
          const distancia = localizacao
            ? calcularDistancia(localizacao.lat, localizacao.lng, p.lat, p.lng).toFixed(2)
            : null;

          return (
            <div
              key={p.id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer relative"
              onClick={() => setModalPonto(p)}
            >
              <button
                className="absolute top-3 right-3"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorito(p.id);
                }}
              >
                {favoritos.includes(p.id) ? (
                  <Star className="text-yellow-400 fill-yellow-400 transition scale-110" />
                ) : (
                  <StarOff className="text-gray-400" />
                )}
              </button>

              <h2 className="text-xl font-bold text-green-700">{p.nome}</h2>
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <MapPin size={18} /> {p.endereco}
              </p>
              <span className="text-sm text-gray-500">{p.bairro}</span>
              {distancia && (
                <p className="text-sm text-gray-500 mt-1">
                  Distância: {distancia} km
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {modalPonto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-xl relative animate-slideUp">
            <button
              className="absolute top-3 right-3"
              onClick={() => setModalPonto(null)}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-green-700">{modalPonto.nome}</h2>

            <p className="text-gray-600 mb-1 flex items-center gap-2">
              <MapPin size={18} /> {modalPonto.endereco}
            </p>
            <p className="text-gray-500 mb-4">Bairro: {modalPonto.bairro}</p>
            {localizacao && (
              <p className="text-gray-500 mb-4">
                Distância:{" "}
                {calcularDistancia(
                  localizacao.lat,
                  localizacao.lng,
                  modalPonto.lat,
                  modalPonto.lng
                ).toFixed(2)}{" "}
                km
              </p>
            )}

            <button
              className="w-full bg-green-600 text-white p-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition"
              onClick={() => abrirRota(modalPonto.lat, modalPonto.lng)}
            >
              <Navigation size={20} /> Abrir no Google Maps
            </button>
          </div>
        </div>
      )}

      <style>
        {`
        .animate-fadeIn {
          animation: fadeIn .3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp .3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0 }
          to { transform: translateY(0); opacity: 1 }
        }
        `}
      </style>
    </div>
  );
}
