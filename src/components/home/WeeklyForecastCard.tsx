"use client";

import { motion } from "framer-motion";
import { Droplets, Sun, Wind } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: ForecastDay[];
    t: Locale;
};

export const WeeklyForecastCard = ({ days, t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex h-full min-h-[360px] min-w-0 flex-col overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <div className="shrink-0">
                <h3 className="text-base font-semibold">{t.sevenDayForecast}</h3>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    Daily temperature, rain, wind and UV
                </p>
            </div>

            <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="flex flex-col gap-2">
                    {days.map((day, index) => {
                        const iconSrc = day.day.condition.icon.startsWith("//")
                            ? `https:${day.day.condition.icon}`
                            : day.day.condition.icon;

                        return (
                            <motion.div
                                key={day.date}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.22, delay: index * 0.025 }}
                                className="grid min-h-[66px] min-w-0 grid-cols-[minmax(90px,1fr)_38px_minmax(95px,1fr)_64px] items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-3 py-2.5 max-sm:grid-cols-[1fr_36px_52px]"
                            >
                                <div className="min-w-0">
                                    <p className="truncate text-xs font-semibold">
                                        {day.date}
                                    </p>
                                    <p className="truncate text-[11px] text-[var(--color-text-muted)]">
                                        {day.day.condition.text}
                                    </p>
                                </div>

                                <img
                                    src={iconSrc}
                                    alt={day.day.condition.text}
                                    className="size-9 object-contain"
                                />

                                <div className="grid grid-cols-3 gap-2 text-[11px] text-[var(--color-text-muted)] max-sm:hidden">
                                    <span className="flex items-center gap-1">
                                        <Droplets className="size-3 text-sky-300" />
                                        {day.day.daily_chance_of_rain}%
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <Wind className="size-3 text-cyan-300" />
                                        {Math.round(day.day.maxwind_kph)}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <Sun className="size-3 text-amber-300" />
                                        {day.day.uv}
                                    </span>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-semibold">
                                        {Math.round(day.day.maxtemp_c)}°
                                    </p>
                                    <p className="text-[11px] text-[var(--color-text-muted)]">
                                        {Math.round(day.day.mintemp_c)}°
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-3 flex shrink-0 items-center justify-between rounded-2xl bg-white/5 px-3 py-2 text-xs text-[var(--color-text-muted)]">
                <span>{days.length} / {days.length}</span>
                <span>{t.forecast}</span>
            </div>
        </motion.section>
    );
};