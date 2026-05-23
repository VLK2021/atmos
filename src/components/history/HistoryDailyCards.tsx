"use client";

import { motion } from "framer-motion";
import {
    CloudRain,
    Droplets,
    Eye,
    Gauge,
    Sun,
    Thermometer,
    Wind,
} from "lucide-react";

import en from "@/src/locales/en";
import type { WeatherHistoryDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: WeatherHistoryDay[];
    t: Locale;
};

export const HistoryDailyCards = ({ days, t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <h2 className="text-base font-semibold">{t.historyDailyDetails}</h2>

            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                {t.historyPageSubtitle}
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {days.map((day, index) => {
                    const iconSrc = day.day.condition.icon.startsWith("//")
                        ? `https:${day.day.condition.icon}`
                        : day.day.condition.icon;

                    const avgPressure = Math.round(
                        day.hour.reduce((acc, hour) => acc + hour.pressure_mb, 0) /
                        day.hour.length,
                    );

                    const metrics = [
                        { icon: Thermometer, label: t.maxTemp, value: `${Math.round(day.day.maxtemp_c)}°` },
                        { icon: Thermometer, label: t.minTemp, value: `${Math.round(day.day.mintemp_c)}°` },
                        { icon: CloudRain, label: t.totalPrecipitation, value: `${day.day.totalprecip_mm} mm` },
                        { icon: Droplets, label: t.averageHumidity, value: `${day.day.avghumidity}%` },
                        { icon: Wind, label: t.maxWind, value: `${Math.round(day.day.maxwind_kph)} km/h` },
                        { icon: Eye, label: t.visibility, value: `${day.day.avgvis_km} km` },
                        { icon: Gauge, label: t.pressure, value: `${avgPressure} hPa` },
                        { icon: Sun, label: t.uvIndex, value: `${day.day.uv}` },
                    ];

                    return (
                        <motion.article
                            key={day.date}
                            initial={{ opacity: 0, y: 12, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.25, delay: index * 0.025 }}
                            whileHover={{ y: -5, scale: 1.01 }}
                            className="relative overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition dark:bg-white/5 dark:shadow-none"
                        >
                            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />

                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold">
                                        {day.date}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-[var(--color-text-muted)]">
                                        {day.day.condition.text}
                                    </p>
                                </div>

                                <img
                                    src={iconSrc}
                                    alt={day.day.condition.text}
                                    className="size-12 object-contain"
                                />
                            </div>

                            <div className="mt-4 flex items-end justify-between">
                                <div>
                                    <p className="text-3xl font-semibold">
                                        {Math.round(day.day.avgtemp_c)}°
                                    </p>

                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        {t.avgTemp}
                                    </p>
                                </div>

                                <div className="text-right text-sm">
                                    <p>{Math.round(day.day.maxtemp_c)}°</p>
                                    <p className="text-[var(--color-text-muted)]">
                                        {Math.round(day.day.mintemp_c)}°
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                                {metrics.map(({ icon: Icon, label, value }) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-2.5 shadow-sm dark:bg-white/5 dark:shadow-none"
                                    >
                                        <Icon className="size-3.5 text-sky-400" />

                                        <p className="mt-2 text-xs font-semibold">
                                            {value}
                                        </p>

                                        <p className="mt-0.5 truncate text-[10px] text-[var(--color-text-muted)]">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </motion.section>
    );
};