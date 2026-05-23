"use client";

import { motion } from "framer-motion";
import { CloudRain, Droplets, Thermometer, Wind } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastHour, ForecastResponse } from "@/src/types";

type Locale = typeof en;

type Props = {
    data: ForecastResponse;
    hours: ForecastHour[];
    t: Locale;
};

export const HourlyHero = ({ data, hours, t }: Props) => {
    const nextHour = hours[0];

    const iconSrc = nextHour.condition.icon.startsWith("//")
        ? `https:${nextHour.condition.icon}`
        : nextHour.condition.icon;

    const maxTemp = Math.max(...hours.map((hour) => hour.temp_c));
    const maxRain = Math.max(...hours.map((hour) => hour.chance_of_rain));
    const maxWind = Math.max(...hours.map((hour) => hour.wind_kph));
    const avgHumidity = Math.round(
        hours.reduce((acc, hour) => acc + hour.humidity, 0) / hours.length,
    );

    const metrics = [
        {
            label: t.maxTemp,
            value: `${Math.round(maxTemp)}°`,
            icon: Thermometer,
        },
        {
            label: t.rainChance,
            value: `${maxRain}%`,
            icon: CloudRain,
        },
        {
            label: t.maxWind,
            value: `${Math.round(maxWind)} km/h`,
            icon: Wind,
        },
        {
            label: t.humidity,
            value: `${avgHumidity}%`,
            icon: Droplets,
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
                animate={{ x: [0, 20, 0], y: [0, -12, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-24 -top-24 size-80 rounded-full bg-sky-400/20 blur-3xl"
            />

            <motion.div
                animate={{ x: [0, -18, 0], y: [0, 14, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-28 left-1/4 size-96 rounded-full bg-indigo-500/15 blur-3xl"
            />

            <div className="relative z-10 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                        {t.hourlyPageTitle}
                    </p>

                    <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                        {data.location.name}, {data.location.country}
                    </h1>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {t.hourlyPageSubtitle}
                    </p>

                    <div className="mt-5 flex items-center gap-4">
                        <p className="text-5xl font-semibold tracking-[-0.08em] sm:text-6xl">
                            {Math.round(nextHour.temp_c)}°
                        </p>

                        <div className="min-w-0">
                            <img
                                src={iconSrc}
                                alt={nextHour.condition.text}
                                className="size-16 object-contain"
                            />

                            <p className="truncate text-sm font-semibold">
                                {nextHour.condition.text}
                            </p>

                            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                                {nextHour.time}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4">
                    {metrics.map(({ label, value, icon: Icon }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.035 }}
                            className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl"
                        >
                            <Icon className="size-4 text-sky-300" />
                            <p className="mt-3 truncate text-sm font-semibold">
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