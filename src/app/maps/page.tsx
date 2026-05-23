import type { Metadata } from "next";

import { WeatherMapsPage } from "@/src/components/maps";

export const metadata: Metadata = {
    title: "Weather Maps | Atmos",
    description:
        "Interactive weather maps with precipitation, temperature, wind and pressure layers.",
};

export default function MapsRoutePage() {
    return <WeatherMapsPage />;
}