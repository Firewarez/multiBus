import React, { useEffect, useRef } from 'react';

// Use as coordenadas aproximadas de João Pessoa, PB
const JOAO_PESSOA_COORDS = { lat: -7.119047, lng: -34.873268 };

// Você precisa de uma função ou um hook para carregar o script da API,
// mas para simplificar, assumimos que a biblioteca 'google' já está disponível globalmente.
// Em um projeto real, você usaria o "@googlemaps/react-wrapper" ou similar.

interface InteractiveMapProps {
  apiKey: string;
}

// O tipo global `google.maps` é assumido como disponível
declare const google: any; 

const InteractiveMap: React.FC<InteractiveMapProps> = ({ apiKey }) => {
  // Cria uma referência para o elemento <div> que irá hospedar o mapa
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifica se a referência ao DOM está disponível
    if (mapRef.current) {
      
      // Funçao para carregar e renderizar o mapa
      const initMap = () => {
        // Inicializa o mapa
        new google.maps.Map(mapRef.current, {
          center: JOAO_PESSOA_COORDS,
          zoom: 13, // Nível de zoom interativo
          mapId: "YOUR_MAP_ID", // Recomendado para personalização na nuvem (opcional)
          mapTypeId: 'satellite', // Para o visual satélite
        });
      };
      
      // Em uma aplicação React real, você precisa garantir que o script da API
      // do Google Maps seja carregado APENAS UMA VEZ.
      // Aqui, assumimos que ele já está carregado ou você o carregará assim:
      
      // Exemplo de carregamento simplificado (requer googlemaps/js-api-loader)
      // Se a variável 'google' já existir (script carregado no index.html), chame initMap()
      if (typeof google !== 'undefined' && google.maps) {
          initMap();
      } else {
          // Em produção, você usaria o Loader para injetar o script dinamicamente.
          console.error("Google Maps API não carregada. Certifique-se de que o script esteja no index.html ou use um loader.");
      }
    }
  }, [apiKey]); // Dependência na API key, embora o mapa só inicialize uma vez

  return (
    // O div precisa ter uma altura definida para que o mapa seja visível
    <div
      ref={mapRef}
      className="w-full h-full"
    />
  );
};

export default InteractiveMap;