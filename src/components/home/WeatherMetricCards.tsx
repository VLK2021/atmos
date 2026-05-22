import {
    Cloud,
    Droplets,
    Eye,
    Gauge,
    Sun,
    Thermometer,
    Wind,
} from "lucide-react";

import type { CurrentWeather } from "@/src/types";

type Props = {
    current: CurrentWeather;
};

export const WeatherMetricCards = ({ current }: Props) => {
    const items = [
        { label: "Wind", value: `${current.wind_kph} km/h`, icon: Wind },
        { label: "Humidity", value: `${current.humidity}%`, icon: Droplets },
        { label: "Pressure", value: `${current.pressure_mb} hPa`, icon: Gauge },
        { label: "Visibility", value: `${current.vis_km} km`, icon: Eye },
        { label: "UV Index", value: `${current.uv}`, icon: Sun },
        { label: "Cloud", value: `${current.cloud}%`, icon: Cloud },
        { label: "Feels Like", value: `${current.feelslike_c}°C`, icon: Thermometer },
    ];

    return (
        <section className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
            {items.map(({ label, value, icon: Icon }) => (
                <div
                    key={label}
                    className="min-w-0 rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
                >
                    <Icon className="size-5 text-sky-300" />

                    <p className="mt-4 truncate text-sm text-[var(--color-text-muted)]">
                        {label}
                    </p>

                    <p className="mt-1 truncate text-2xl font-semibold">
                        {value}
                    </p>
                </div>
            ))}
        </section>
    );
};