"use client";

import { motion } from "framer-motion";
import {
    Cloud,
    Droplets,
    Eye,
    Gauge,
    Snowflake,
    Sun,
    Thermometer,
    Wind,
} from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastHour } from "@/src/types";

type Locale = typeof en;

type Props = {
    hours: ForecastHour[];
    t: Locale;
};

export const HourlyDetailsGrid = ({ hours, t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <h2 className="text-base font-semibold">{t.hourlyDetails}</h2>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                Full hourly conditions table
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {hours.map((hour, index) => {
                    const iconSrc = hour.condition.icon.startsWith("//")
                        ? `https:${hour.condition.icon}`
                        : hour.condition.icon;

                    const metrics = [
                        {
                            icon: Thermometer,
                            label: t.feels,
                            value: `${Math.round(hour.feelslike_c)}°`,
                        },
                        {
                            icon: Droplets,
                            label: t.rainChance,
                            value: `${hour.chance_of_rain}%`,
                        },
                        {
                            icon: Snowflake,
                            label: t.snow,
                            value: `${hour.chance_of_snow}%`,
                        },
                        {
                            icon: Wind,
                            label: t.wind,
                            value: `${Math.round(hour.wind_kph)} km/h`,
                        },
                        {
                            icon: Gauge,
                            label: t.pressure,
                            value: `${hour.pressure_mb} hPa`,
                        },
                        {
                            icon: Eye,
                            label: t.visibility,
                            value: `${hour.vis_km} km`,
                        },
                        {
                            icon: Sun,
                            label: t.uvIndex,
                            value: `${hour.uv}`,
                        },
                        {
                            icon: Cloud,
                            label: t.cloud,
                            value: `${hour.cloud}%`,
                        },
                    ];

                    return (
                        <motion.article
                            key={hour.time_epoch}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.015 }}
                            className="rounded-[24px] border border-[var(--color-border)] bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold">
                                        {hour.time.split(" ")[1]}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-[var(--color-text-muted)]">
                                        {hour.condition.text}
                                    </p>
                                </div>

                                <img
                                    src={iconSrc}
                                    alt={hour.condition.text}
                                    className="size-12 object-contain"
                                />
                            </div>

                            <div className="mt-4 flex items-end justify-between">
                                <div>
                                    <p className="text-3xl font-semibold">
                                        {Math.round(hour.temp_c)}°
                                    </p>

                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        {t.temperatureByHour}
                                    </p>
                                </div>

                                <div className="text-right text-xs text-[var(--color-text-muted)]">
                                    <p>{t.dewPoint}: {Math.round(hour.dewpoint_c)}°</p>
                                    <p>{t.heatIndex}: {Math.round(hour.heatindex_c)}°</p>
                                    <p>{t.windChill}: {Math.round(hour.windchill_c)}°</p>
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
                        </motion.article>
                    );
                })}
            </div>
        </motion.section>
    );
};