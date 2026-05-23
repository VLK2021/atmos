import type { Metadata } from "next";

import { AirQualityPage } from "@/src/components/air-quality";

export const metadata: Metadata = {
    title: "Air Quality | Atmos",
    description:
        "Detailed air quality dashboard with AQI, PM2.5, PM10, ozone, nitrogen dioxide, sulfur dioxide and carbon monoxide.",
};

export default function AirQualityRoutePage() {
    return <AirQualityPage />;
}