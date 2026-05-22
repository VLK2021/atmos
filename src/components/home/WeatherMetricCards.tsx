"use client";

import { motion } from "framer-motion";
import {
    Cloud,
    Droplets,
    Eye,
    Gauge,
    Navigation,
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
        {
            label: t.wind,
            value: `${Math.round(current.wind_kph)} km/h`,
            sub: current.wind_dir,
            icon: Wind,
        },
        {
            label: "Gust",
            value: `${Math.round(current.gust_kph)} km/h`,
            sub: "Wind peak",
            icon: Navigation,
        },
        {
            label: t.humidity,
            value: `${current.humidity}%`,
            sub: "Relative",
            icon: Droplets,
        },
        {
            label: t.pressure,
            value: `${current.pressure_mb}`,
            sub: "hPa",
            icon: Gauge,
        },
        {
            label: t.visibility,
            value: `${current.vis_km}`,
            sub: "km",
            icon: Eye,
        },
        {
            label: t.uvIndex,
            value: `${current.uv}`,
            sub: "Solar intensity",
            icon: Sun,
        },
        {
            label: t.cloud,
            value: `${current.cloud}%`,
            sub: "Coverage",
            icon: Cloud,
        },
        {
            label: t.feelsLike,
            value: `${Math.round(current.feelslike_c)}°`,
            sub: "Apparent",
            icon: Thermometer,
        },
    ];

    return (
        <section className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(({ label, value, sub, icon: Icon }, index) => (
                <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.035 }}
                    className="group min-w-0 overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-400/10">
                            <Icon className="size-5 text-sky-300" />
                        </div>

                        <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-[var(--color-text-muted)]">
                            Live
                        </span>
                    </div>

                    <p className="mt-4 truncate text-xs text-[var(--color-text-muted)]">
                        {label}
                    </p>

                    <p className="mt-1 truncate text-xl font-semibold">
                        {value}
                    </p>

                    <p className="mt-1 truncate text-xs text-[var(--color-text-muted)]">
                        {sub}
                    </p>
                </motion.div>
            ))}
        </section>
    );
};