"use client";

import { Icon, LatLngExpression } from "leaflet";
import {
    MapContainer,
    Marker,
    TileLayer,
    ZoomControl,
} from "react-leaflet";

import type { WeatherMapLayer } from "@/src/types";

import "leaflet/dist/leaflet.css";

type Props = {
    lat: number;
    lon: number;
    city: string;
    layer: WeatherMapLayer;
    opacity: number;
};

const markerIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export const WeatherInteractiveMap = ({
                                          lat,
                                          lon,
                                          city,
                                          layer,
                                          opacity,
                                      }: Props) => {
    const center: LatLngExpression = [lat, lon];

    return (
        <MapContainer
            center={center}
            zoom={8}
            scrollWheelZoom
            zoomControl={false}
            className="h-full w-full"
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <TileLayer
                key={layer}
                url={`https://weathermaps.weatherapi.com/${layer}/tiles/now/{z}/{x}/{y}.png`}
                opacity={opacity}
            />

            <Marker position={center} icon={markerIcon} title={city} />

            <ZoomControl position="bottomright" />
        </MapContainer>
    );
};