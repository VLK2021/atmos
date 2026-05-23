import type { Metadata } from "next";

import { HourlyPage } from "@/src/components/hourly";

export const metadata: Metadata = {
    title: "Hourly Forecast | Atmos",
    description:
        "Detailed hourly weather forecast with temperature, rain probability, wind speed, humidity, pressure and feels-like analytics.",
};

export default function HourlyRoutePage() {
    return <HourlyPage />;
}