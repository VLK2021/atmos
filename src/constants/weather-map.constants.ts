export type WeatherMapLayer = "precip" | "tmp2m" | "pressure" | "wind";

export type WeatherMapLayerConfig = {
    value: WeatherMapLayer;
    labelKey:
        | "precipitationLayer"
        | "temperatureLayer"
        | "pressureLayer"
        | "windLayer";
    gradient: string;
    min: string;
    mid: string;
    max: string;
};

export const WEATHER_MAP_LAYERS: WeatherMapLayerConfig[] = [
    {
        value: "precip",
        labelKey: "precipitationLayer",
        gradient: "from-sky-300 via-blue-500 to-indigo-700",
        min: "Dry",
        mid: "Rain",
        max: "Heavy",
    },
    {
        value: "tmp2m",
        labelKey: "temperatureLayer",
        gradient: "from-blue-500 via-amber-400 to-red-500",
        min: "Cold",
        mid: "Mild",
        max: "Hot",
    },
    {
        value: "pressure",
        labelKey: "pressureLayer",
        gradient: "from-violet-500 via-sky-400 to-emerald-400",
        min: "Low",
        mid: "Normal",
        max: "High",
    },
    {
        value: "wind",
        labelKey: "windLayer",
        gradient: "from-cyan-300 via-sky-500 to-violet-600",
        min: "Calm",
        mid: "Windy",
        max: "Strong",
    },
];