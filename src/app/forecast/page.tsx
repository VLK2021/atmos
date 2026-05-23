import type { Metadata } from "next";

import { ForecastPage } from "@/src/components/forecast";

export const metadata: Metadata = {
    title: "Forecast | Atmos",
    description:
        "Detailed weather forecast with temperature trends, hourly timeline, rain analytics, wind analytics and daily weather insights.",
};

export default function ForecastRoutePage() {
    return <ForecastPage />;
}