"use client";

import { motion } from "framer-motion";
import { CloudRain, Droplets, ThermometerSun, ThermometerSnowflake } from "lucide-react";

import en from "@/src/locales/en";
import type { WeatherHistoryDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: WeatherHistoryDay[];
    t: Locale;
};

export const HistoryStatsCards = ({ days, t }: Props) => {
    const highestTemp = Math.max(...days.map((day) => day.day.maxtemp_c));
    const lowestTemp = Math.min(...days.map((day) => day.day.mintemp_c));
    const avgHumidity = Math.round(
        days.reduce((acc, day) => acc + day.day.avghumidity, 0) / days.length,
    );
    const totalRain = days.reduce((acc, day) => acc + day.day.totalprecip_mm, 0);

    const stats = [
        {
            label: t.highestTemperature,
            value: `${Math.round(highestTemp)}°C`,
            icon: ThermometerSun,
        },
        {
            label: t.lowestTemperature,
            value: `${Math.round(lowestTemp)}°C`,
            icon: ThermometerSnowflake,
        },
        {
            label: t.averageHumidity,
            value: `${avgHumidity}%`,
            icon: Droplets,
        },
        {
            label: t.totalPrecipitation,
            value: `${totalRain.toFixed(1)} mm`,
            icon: CloudRain,
        },
    ];

    return (
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }, index) => (
                <motion.article
                    key={label}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.28,
                        delay: index * 0.045,
                        ease: "easeOut",
                    }}
                    whileHover={{ y: -4, scale: 1.015 }}
                    className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
                >
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                            duration: 28,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -right-8 -top-8 size-24 rounded-full border border-sky-300/15"
                    />

                    <div className="relative z-10">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-400/12">
                            <Icon className="size-5 text-sky-300" />
                        </div>

                        <p className="mt-4 text-2xl font-semibold">{value}</p>

                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                            {label}
                        </p>
                    </div>
                </motion.article>
            ))}
        </div>
    );
};