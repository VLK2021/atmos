"use client";

import { motion } from "framer-motion";
import {
    CloudRain,
    Droplets,
    Eye,
    Gauge,
    Sun,
    Sunrise,
    Sunset,
    Wind,
} from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: ForecastDay[];
    t: Locale;
};

export const ForecastDailyCards = ({ days, t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <h2 className="text-base font-semibold">{t.dailyForecastDetails}</h2>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                Complete daily breakdown
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {days.map((day, index) => {
                    const iconSrc = day.day.condition.icon.startsWith("//")
                        ? `https:${day.day.condition.icon}`
                        : day.day.condition.icon;

                    const metrics = [
                        {
                            icon: CloudRain,
                            label: t.rainChance,
                            value: `${day.day.daily_chance_of_rain}%`,
                        },
                        {
                            icon: Droplets,
                            label: t.totalRain,
                            value: `${day.day.totalprecip_mm} mm`,
                        },
                        {
                            icon: Wind,
                            label: t.maxWind,
                            value: `${Math.round(day.day.maxwind_kph)} km/h`,
                        },
                        {
                            icon: Gauge,
                            label: t.humidity,
                            value: `${day.day.avghumidity}%`,
                        },
                        {
                            icon: Eye,
                            label: t.visibility,
                            value: `${day.day.avgvis_km} km`,
                        },
                        {
                            icon: Sun,
                            label: t.uvIndex,
                            value: `${day.day.uv}`,
                        },
                    ];

                    return (
                        <motion.article
                            key={day.date}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: index * 0.025 }}
                            className="overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                        >
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
                                        className="rounded-2xl bg-white/5 p-2.5"
                                    >
                                        <Icon className="size-3.5 text-sky-300" />
                                        <p className="mt-2 text-xs font-semibold">
                                            {value}
                                        </p>
                                        <p className="mt-0.5 truncate text-[10px] text-[var(--color-text-muted)]">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                                <div className="rounded-2xl bg-white/5 p-2.5">
                                    <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                                        <Sunrise className="size-3.5 text-amber-300" />
                                        {t.sunrise}
                                    </div>
                                    <p className="mt-1 font-semibold">
                                        {day.astro.sunrise}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-2.5">
                                    <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                                        <Sunset className="size-3.5 text-orange-400" />
                                        {t.sunset}
                                    </div>
                                    <p className="mt-1 font-semibold">
                                        {day.astro.sunset}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </motion.section>
    );
};