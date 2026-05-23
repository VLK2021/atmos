"use client";

import { motion } from "framer-motion";
import {
    CloudRain,
    Droplets,
    Gauge,
    Sunrise,
    Sunset,
    Thermometer,
    Wind,
} from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastResponse } from "@/src/types";

type Locale = typeof en;

type Props = {
    data: ForecastResponse;
    t: Locale;
};

export const ForecastHero = ({ data, t }: Props) => {
    const today = data.forecast.forecastday[0];

    const iconSrc = data.current.condition.icon.startsWith("//")
        ? `https:${data.current.condition.icon}`
        : data.current.condition.icon;

    const metrics = [
        {
            label: t.maxTemp,
            value: `${Math.round(today.day.maxtemp_c)}°`,
            icon: Thermometer,
        },
        {
            label: t.minTemp,
            value: `${Math.round(today.day.mintemp_c)}°`,
            icon: Thermometer,
        },
        {
            label: t.rainChance,
            value: `${today.day.daily_chance_of_rain}%`,
            icon: CloudRain,
        },
        {
            label: t.wind,
            value: `${Math.round(today.day.maxwind_kph)} km/h`,
            icon: Wind,
        },
        {
            label: t.humidity,
            value: `${today.day.avghumidity}%`,
            icon: Droplets,
        },
        {
            label: t.pressure,
            value: `${data.current.pressure_mb} hPa`,
            icon: Gauge,
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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

            <div className="relative z-10 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                        {t.forecastPageTitle}
                    </p>

                    <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                        {data.location.name}, {data.location.country}
                    </h1>

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
                                className="size-16 object-contain"
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
                            <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                                <Sunrise className="size-3.5 text-amber-300" />
                                {t.sunrise}
                            </div>
                            <p className="mt-1 text-xs font-semibold">
                                {today.astro.sunrise}
                            </p>
                        </div>

                        <div className="rounded-xl bg-white/10 p-2.5">
                            <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                                <Sunset className="size-3.5 text-orange-400" />
                                {t.sunset}
                            </div>
                            <p className="mt-1 text-xs font-semibold">
                                {today.astro.sunset}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3">
                    {metrics.map(({ label, value, icon: Icon }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.24, delay: index * 0.035 }}
                            className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl transition hover:bg-white/15"
                        >
                            <Icon className="size-4 text-sky-300" />
                            <p className="mt-3 truncate text-sm font-semibold">{value}</p>
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