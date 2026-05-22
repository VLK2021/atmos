"use client";

import { Icon, LatLngExpression } from "leaflet";
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

export const WeatherMiniMap = ({ lat, lon, city }: Props) => {
    const center: LatLngExpression = [lat, lon];

    return (
        <MapContainer
            center={center}
            zoom={9}
            scrollWheelZoom={false}
            zoomControl={false}
            className="h-full w-full"
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <TileLayer
                url="https://weathermaps.weatherapi.com/precip/tiles/now/{z}/{x}/{y}.png"
                opacity={0.55}
            />

            <Marker
                position={center}
                icon={markerIcon}
                title={city}
            />

            <ZoomControl position="bottomright" />
        </MapContainer>
    );
};