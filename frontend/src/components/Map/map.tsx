import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import configData from "../../config";
import Box from "@mui/material/Box";
import Navbar from "../Navbar/navbar";

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef<maptilersdk.Map | null>(null);
    const center = { lng: -157.9253, lat: 21.4732 };
    const [zoom] = useState(9.79);
    maptilersdk.config.apiKey = configData.MAPTILER_API_KEY;

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once
        if (!mapContainer.current) return; // ensure container is available

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [center.lng, center.lat],
            zoom: zoom
        });

        new maptilersdk.Marker({ color: "#FF0000" })
            .setLngLat([-157.858677, 21.3067])
            .addTo(map.current);

    }, [center.lng, center.lat, zoom]);

    return (
        <Box sx={{ display: "flex" }}>
            <Navbar handleDrawerOpen={() => {}} open={false} />
            <div className="container">
                <div ref={mapContainer} id="map" className="map" />
            </div>
        </Box>
    );
}