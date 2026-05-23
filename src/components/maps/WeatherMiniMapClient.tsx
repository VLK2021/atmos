"use client";

import { Icon, type LatLngExpression } from "leaflet";
import {
    MapContainer,
    Marker,
    TileLayer,
    ZoomControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Props = {
    lat: number;
    lon: number;
    city: string;
};

const markerIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const getWeatherApiTimeKey = () => {
    const date = new Date();
    date.setUTCHours(date.getUTCHours() - 2);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hour = String(date.getUTCHours()).padStart(2, "0");

    return `${year}${month}${day}${hour}`;
};

export const WeatherMiniMapClient = ({ lat, lon, city }: Props) => {
    const center: LatLngExpression = [lat, lon];
    const timeKey = getWeatherApiTimeKey();

    return (
        <MapContainer
            key={`${lat}-${lon}`}
            center={center}
            zoom={6}
            minZoom={3}
            maxZoom={7}
            scrollWheelZoom={false}
            zoomControl={false}
            className="h-full w-full"
        >
            <TileLayer
                attribution="© OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <TileLayer
                attribution="© WeatherAPI.com"
                url={`https://weathermaps.weatherapi.com/tmp2m/tiles/${timeKey}/{z}/{x}/{y}.png`}
                opacity={0.72}
                zIndex={20}
            />

            <Marker position={center} icon={markerIcon} title={city} />

            <ZoomControl position="bottomright" />
        </MapContainer>
    );
};