"use client";

import dynamic from "next/dynamic";

import type { WeatherMapLayer } from "@/src/constants/weather-map.constants";

type Props = {
    lat: number;
    lon: number;
    city: string;
    layer: WeatherMapLayer;
    opacity: number;
};

const WeatherInteractiveMapClient = dynamic(
    () =>
        import("@/src/components/maps/WeatherInteractiveMapClient").then(
            (mod) => mod.WeatherInteractiveMapClient,
        ),
    {
        ssr: false,
    },
);

export const WeatherInteractiveMap = (props: Props) => {
    return <WeatherInteractiveMapClient {...props} />;
};