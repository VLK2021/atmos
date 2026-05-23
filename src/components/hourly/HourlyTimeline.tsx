"use client";

import { motion } from "framer-motion";
import { Droplets, Thermometer, Wind } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastHour } from "@/src/types";

type Locale = typeof en;

type Props = {
    hours: ForecastHour[];
    t: Locale;
};

export const HourlyTimeline = ({ hours, t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <h2 className="text-base font-semibold">{t.hourlyTimeline}</h2>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                {t.temperatureByHour}, {t.rainByHour}, {t.windByHour}
            </p>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {hours.map((hour, index) => {
                    const iconSrc = hour.condition.icon.startsWith("//")
                        ? `https:${hour.condition.icon}`
                        : hour.condition.icon;

                    return (
                        <motion.article
                            key={hour.time_epoch}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.015 }}
                            className="min-w-[136px] rounded-3xl border border-[var(--color-border)] bg-white/10 p-3 transition hover:-translate-y-0.5 hover:bg-white/15"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    {hour.time.split(" ")[1]}
                                </p>

                                <img
                                    src={iconSrc}
                                    alt={hour.condition.text}
                                    className="size-9 object-contain"
                                />
                            </div>

                            <p className="mt-3 text-2xl font-semibold">
                                {Math.round(hour.temp_c)}°
                            </p>

                            <p className="mt-1 line-clamp-1 text-xs text-[var(--color-text-muted)]">
                                {hour.condition.text}
                            </p>

                            <div className="mt-3 space-y-1.5 text-xs text-[var(--color-text-muted)]">
                                <p className="flex items-center gap-1.5">
                                    <Thermometer className="size-3.5 text-orange-300" />
                                    {t.feels} {Math.round(hour.feelslike_c)}°
                                </p>

                                <p className="flex items-center gap-1.5">
                                    <Droplets className="size-3.5 text-sky-300" />
                                    {hour.chance_of_rain}%
                                </p>

                                <p className="flex items-center gap-1.5">
                                    <Wind className="size-3.5 text-cyan-300" />
                                    {Math.round(hour.wind_kph)} km/h
                                </p>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </motion.section>
    );
};