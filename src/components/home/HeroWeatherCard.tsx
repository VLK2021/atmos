import {
    Droplets,
    Eye,
    Gauge,
    ThermometerSun,
    Wind,
} from "lucide-react";

import type { ForecastResponse } from "@/src/types";

type Props = {
    data: ForecastResponse;
};

export const HeroWeatherCard = ({ data }: Props) => {
    const today = data.forecast.forecastday[0];
    const iconSrc = data.current.condition.icon.startsWith("//")
        ? `https:${data.current.condition.icon}`
        : data.current.condition.icon;

    return (
        <section className="relative min-h-[300px] overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-6 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(56,189,248,0.24),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(251,146,60,0.22),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.08),rgba(30,41,59,0.02))]" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div>
                    <h2 className="text-2xl font-bold sm:text-3xl">
                        {data.location.name}, {data.location.country}
                    </h2>

                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                        {data.location.localtime}
                    </p>
                </div>

                <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
                        <p className="text-7xl font-semibold tracking-[-0.08em] sm:text-8xl lg:text-9xl">
                            {Math.round(data.current.temp_c)}°
                        </p>

                        <div className="min-w-0">
                            <img
                                src={iconSrc}
                                alt={data.current.condition.text}
                                className="size-20 object-contain sm:size-24"
                            />

                            <p className="truncate text-xl font-semibold">
                                {data.current.condition.text}
                            </p>

                            <p className="text-sm text-[var(--color-text-muted)]">
                                Feels like {Math.round(data.current.feelslike_c)}°C
                            </p>
                        </div>
                    </div>

                    <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 xl:w-[560px]">
                        {[
                            {
                                icon: ThermometerSun,
                                label: "Max / Min",
                                value: `${Math.round(today.day.maxtemp_c)}° / ${Math.round(today.day.mintemp_c)}°`,
                            },
                            {
                                icon: Wind,
                                label: "Wind",
                                value: `${Math.round(data.current.wind_kph)} km/h`,
                            },
                            {
                                icon: Droplets,
                                label: "Humidity",
                                value: `${data.current.humidity}%`,
                            },
                            {
                                icon: Gauge,
                                label: "Pressure",
                                value: `${data.current.pressure_mb} hPa`,
                            },
                            {
                                icon: Eye,
                                label: "Visibility",
                                value: `${data.current.vis_km} km`,
                            },
                        ].map(({ icon: Icon, label, value }) => (
                            <div
                                key={label}
                                className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl"
                            >
                                <Icon className="mb-2 size-4 text-sky-300" />

                                <p className="truncate text-sm font-semibold">
                                    {value}
                                </p>

                                <p className="truncate text-xs text-[var(--color-text-muted)]">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};