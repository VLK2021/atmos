"use client";

import { motion } from "framer-motion";
import {
    Cloud,
    Droplets,
    Eye,
    Gauge,
    Navigation,
    Sun,
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

export const HeroWeatherCard = ({ data, t }: Props) => {
    const today = data.forecast.forecastday[0];

    const iconSrc = data.current.condition.icon.startsWith("//")
        ? `https:${data.current.condition.icon}`
        : data.current.condition.icon;

    const metrics = [
        {
            icon: ThermometerSun,
            label: t.maxMin,
            value: `${Math.round(today.day.maxtemp_c)}° / ${Math.round(today.day.mintemp_c)}°`,
        },
        {
            icon: Droplets,
            label: t.humidity,
            value: `${data.current.humidity}%`,
        },
        {
            icon: Wind,
            label: t.wind,
            value: `${Math.round(data.current.wind_kph)} km/h`,
        },
        {
            icon: Gauge,
            label: t.pressure,
            value: `${data.current.pressure_mb} hPa`,
        },
        {
            icon: Eye,
            label: t.visibility,
            value: `${data.current.vis_km} km`,
        },
        {
            icon: Sun,
            label: t.uvIndex,
            value: `${data.current.uv}`,
        },
        {
            icon: Cloud,
            label: t.cloud,
            value: `${data.current.cloud}%`,
        },
        {
            icon: Navigation,
            label: "Wind dir",
            value: data.current.wind_dir,
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-5 lg:p-6"
        >
            <motion.div
                animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-24 -top-24 size-80 rounded-full bg-sky-400/20 blur-3xl"
            />

            <motion.div
                animate={{ x: [0, -14, 0], y: [0, 12, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-32 left-1/4 size-96 rounded-full bg-violet-500/15 blur-3xl"
            />

            <div className="relative z-10 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="flex min-w-0 flex-col justify-between rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                    <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                            {t.currentLocation}
                        </p>

                        <h2 className="mt-2 truncate text-2xl font-bold sm:text-3xl">
                            {data.location.name}, {data.location.country}
                        </h2>

                        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                            {data.location.localtime}
                        </p>
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                        <p className="text-6xl font-semibold tracking-[-0.08em] sm:text-7xl">
                            {Math.round(data.current.temp_c)}°
                        </p>

                        <div className="min-w-0">
                            <img
                                src={iconSrc}
                                alt={data.current.condition.text}
                                className="size-16 object-contain sm:size-20"
                            />

                            <p className="truncate text-base font-semibold sm:text-lg">
                                {data.current.condition.text}
                            </p>

                            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                                {t.feelsLike} {Math.round(data.current.feelslike_c)}°C
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-2xl bg-white/10 p-3">
                            <p className="text-xs text-[var(--color-text-muted)]">
                                {t.sunrise}
                            </p>
                            <p className="mt-1 font-semibold">{today.astro.sunrise}</p>
                        </div>

                        <div className="rounded-2xl bg-white/10 p-3">
                            <p className="text-xs text-[var(--color-text-muted)]">
                                {t.sunset}
                            </p>
                            <p className="mt-1 font-semibold">{today.astro.sunset}</p>
                        </div>
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {metrics.map(({ icon: Icon, label, value }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.035 }}
                            className="min-w-0 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/15"
                        >
                            <Icon className="size-4 text-sky-300" />

                            <p className="mt-4 truncate text-sm font-semibold">
                                {value}
                            </p>

                            <p className="mt-1 truncate text-xs text-[var(--color-text-muted)]">
                                {label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};