import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import configData from "../../config";
import Box from "@mui/material/Box";
import Navbar from "../Navbar/navbar";
import SearchBar from "../SearchBar/searchbar";

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef<maptilersdk.Map | null>(null);
    const center = { lng: -157.9253, lat: 21.4732 };
    const [zoom] = useState(9.79);
    const [drawerOpen, setDrawerOpen] = useState(false);
    maptilersdk.config.apiKey = configData.MAPTILER_API_KEY;

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once
        if (!mapContainer.current) return; // ensure container is available

        //Função para obter a localização do usuario
        //Caso seja verdadeiro, o mapa é gerado pela linha map.current = new maptilersdk.Map...
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            map.current = new maptilersdk.Map({
                container: mapContainer.current as unknown as HTMLElement,
                style: maptilersdk.MapStyle.STREETS,
                center: [longitude, latitude],
                zoom: zoom
            });

            new maptilersdk.Marker({ color: "#FF0000" })
                .setLngLat([-157.858677, 21.3067])
                .addTo(map.current);

        }, error => {
            console.error("Erro ao obter a localização:", error);
            map.current = new maptilersdk.Map({
                container: mapContainer.current as unknown as HTMLElement,
                style: maptilersdk.MapStyle.STREETS,
                center: [center.lng, center.lat],
                zoom: zoom
            });
        });



    }, [center.lng, center.lat, zoom]);

    return (
        <Box sx={{ display: "flex", position: "relative", margin: 0, padding: 0, height: "100vh", width: "100vw" }}>
            <Navbar onDrawerChange={setDrawerOpen} />
            <SearchBar data={[]} drawerOpen={drawerOpen} />
            <div className="container">
                <div ref={mapContainer} id="map" className="map" />
            </div>
        </Box>
    );
}