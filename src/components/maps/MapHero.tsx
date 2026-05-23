"use client";

import { motion } from "framer-motion";
import {
    Compass,
    Droplets,
    Gauge,
    Layers,
    MapPinned,
    Navigation,
    ThermometerSun,
    Wind,
} from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastResponse } from "@/src/types";

type Locale = typeof en;

type Props = {
    data: ForecastResponse;
    t: Locale;
};

export const MapHero = ({ data, t }: Props) => {
    const current = data.current;

    const metrics = [
        {
            label: t.temperatureLayer,
            value: `${Math.round(current.temp_c)}°C`,
            sub: `${t.feelsLike} ${Math.round(current.feelslike_c)}°C`,
            icon: ThermometerSun,
        },
        {
            label: t.wind,
            value: `${Math.round(current.wind_kph)} km/h`,
            sub: `${current.wind_dir} · ${t.gust} ${Math.round(current.gust_kph)} km/h`,
            icon: Wind,
        },
        {
            label: t.humidity,
            value: `${current.humidity}%`,
            sub: `${t.cloud}: ${current.cloud}%`,
            icon: Droplets,
        },
        {
            label: t.pressure,
            value: `${current.pressure_mb} hPa`,
            sub: `${t.visibility}: ${current.vis_km} km`,
            icon: Gauge,
        },
        {
            label: t.mapCoordinates,
            value: `${data.location.lat}, ${data.location.lon}`,
            sub: data.location.tz_id,
            icon: MapPinned,
        },
        {
            label: t.mapLayer,
            value: t.weatherMap,
            sub: t.mapZoomHint,
            icon: Layers,
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-5 lg:p-6"
        >
            <motion.div
                animate={{ x: [0, 22, 0], y: [0, -14, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-24 -top-24 size-80 rounded-full bg-sky-400/20 blur-3xl"
            />

            <motion.div
                animate={{ x: [0, -18, 0], y: [0, 16, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-28 left-1/4 size-96 rounded-full bg-violet-500/15 blur-3xl"
            />

            <div className="relative z-10 grid gap-4 xl:grid-cols-[0.78fr_1.22fr]">
                <div className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                        {t.mapsPageTitle}
                    </p>

                    <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                        {data.location.name}, {data.location.country}
                    </h1>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {t.mapsPageSubtitle}
                    </p>

                    <div className="mt-5 flex items-center gap-4">
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-sky-400/15 ring-1 ring-sky-300/20">
                            <Navigation className="size-8 text-sky-300" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-lg font-semibold">
                                {current.condition.text}
                            </p>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {t.lastUpdated}: {current.last_updated}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-3">
                        <div className="flex items-center gap-2">
                            <Compass className="size-4 text-sky-300" />

                            <p className="text-sm font-semibold">
                                {t.mapZoomHint}
                            </p>
                        </div>

                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                            {t.mapCoordinates}: {data.location.lat}, {data.location.lon}
                        </p>
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-2 lg:grid-cols-3">
                    {metrics.map(({ label, value, sub, icon: Icon }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.035 }}
                            className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/15"
                        >
                            <Icon className="size-4 text-sky-300" />

                            <p className="mt-3 truncate text-sm font-semibold">
                                {value}
                            </p>

                            <p className="mt-0.5 truncate text-[11px] text-[var(--color-text-muted)]">
                                {label}
                            </p>

                            <p className="mt-2 line-clamp-2 text-[11px] text-[var(--color-text-muted)]">
                                {sub}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};