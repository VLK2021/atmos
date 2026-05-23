"use client";

import dynamic from "next/dynamic";

type Props = {
    lat: number;
    lon: number;
    city: string;
};

const WeatherMiniMapClient = dynamic(
    () =>
        import("@/src/components/maps/WeatherMiniMapClient").then(
            (mod) => mod.WeatherMiniMapClient,
        ),
    {
        ssr: false,
    },
);

export const WeatherMiniMap = (props: Props) => {
    return <WeatherMiniMapClient {...props} />;
};