"use client";

import { motion } from "framer-motion";
import { CloudRain, Moon, Sun, Wind } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: ForecastDay[];
    t: Locale;
};

export const ForecastInsights = ({ days, t }: Props) => {
    const warmestDay = [...days].sort((a, b) => b.day.maxtemp_c - a.day.maxtemp_c)[0];
    const coldestNight = [...days].sort((a, b) => a.day.mintemp_c - b.day.mintemp_c)[0];
    const wettestDay = [...days].sort((a, b) => b.day.totalprecip_mm - a.day.totalprecip_mm)[0];
    const strongestWind = [...days].sort((a, b) => b.day.maxwind_kph - a.day.maxwind_kph)[0];

    const insights = [
        {
            label: t.warmestDay,
            value: `${warmestDay.date} · ${Math.round(warmestDay.day.maxtemp_c)}°`,
            icon: Sun,
        },
        {
            label: t.coldestNight,
            value: `${coldestNight.date} · ${Math.round(coldestNight.day.mintemp_c)}°`,
            icon: Moon,
        },
        {
            label: t.wettestDay,
            value: `${wettestDay.date} · ${wettestDay.day.totalprecip_mm} mm`,
            icon: CloudRain,
        },
        {
            label: t.strongestWind,
            value: `${strongestWind.date} · ${Math.round(strongestWind.day.maxwind_kph)} km/h`,
            icon: Wind,
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <h2 className="text-base font-semibold">{t.forecastInsights}</h2>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                Automatically calculated from forecast data
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                {insights.map(({ label, value, icon: Icon }, index) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: index * 0.035 }}
                        className="rounded-2xl border border-white/5 bg-white/5 p-3"
                    >
                        <Icon className="size-4 text-sky-300" />
                        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                            {label}
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold">
                            {value}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};