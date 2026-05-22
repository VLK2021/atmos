import {
    Cloud,
    Droplets,
    Eye,
    Gauge,
    Sun,
    Thermometer,
    Wind,
} from "lucide-react";

import en from "@/src/locales/en";
import type { CurrentWeather } from "@/src/types";

type Locale = typeof en;

type Props = {
    current: CurrentWeather;
    t: Locale;
};

export const WeatherMetricCards = ({ current, t }: Props) => {
    const items = [
        { label: t.wind, value: `${current.wind_kph} km/h`, icon: Wind },
        { label: t.humidity, value: `${current.humidity}%`, icon: Droplets },
        { label: t.pressure, value: `${current.pressure_mb} hPa`, icon: Gauge },
        { label: t.visibility, value: `${current.vis_km} km`, icon: Eye },
        { label: t.uvIndex, value: `${current.uv}`, icon: Sun },
        { label: t.cloud, value: `${current.cloud}%`, icon: Cloud },
        {
            label: t.feelsLike,
            value: `${current.feelslike_c}°C`,
            icon: Thermometer,
        },
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