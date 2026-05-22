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
            label: "Dir",
            value: data.current.wind_dir,
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="absolute -bottom-24 left-1/4 size-80 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative z-10 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                        {t.currentLocation}
                    </p>

                    <h2 className="mt-1 truncate text-xl font-bold sm:text-2xl">
                        {data.location.name}, {data.location.country}
                    </h2>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {data.location.localtime}
                    </p>

                    <div className="mt-5 flex items-center gap-4">
                        <p className="text-5xl font-semibold tracking-[-0.08em] sm:text-6xl">
                            {Math.round(data.current.temp_c)}°
                        </p>

                        <div className="min-w-0">
                            <img
                                src={iconSrc}
                                alt={data.current.condition.text}
                                className="size-14 object-contain sm:size-16"
                            />

                            <p className="truncate text-sm font-semibold">
                                {data.current.condition.text}
                            </p>

                            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                                {t.feelsLike} {Math.round(data.current.feelslike_c)}°C
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-white/10 p-2.5">
                            <p className="text-[11px] text-[var(--color-text-muted)]">
                                {t.sunrise}
                            </p>
                            <p className="mt-0.5 text-xs font-semibold">
                                {today.astro.sunrise}
                            </p>
                        </div>

                        <div className="rounded-xl bg-white/10 p-2.5">
                            <p className="text-[11px] text-[var(--color-text-muted)]">
                                {t.sunset}
                            </p>
                            <p className="mt-0.5 text-xs font-semibold">
                                {today.astro.sunset}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4">
                    {metrics.map(({ icon: Icon, label, value }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.025 }}
                            className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl transition hover:bg-white/15"
                        >
                            <Icon className="size-4 text-sky-300" />

                            <p className="mt-3 truncate text-xs font-semibold">
                                {value}
                            </p>

                            <p className="mt-0.5 truncate text-[11px] text-[var(--color-text-muted)]">
                                {label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};