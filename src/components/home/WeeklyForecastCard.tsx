"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Droplets, Wind } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import en from "@/src/locales/en";
import type { ForecastDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: ForecastDay[];
    t: Locale;
};

export const WeeklyForecastCard = ({ days, t }: Props) => {
    const [expanded, setExpanded] = useState(false);

    const visibleDays = expanded ? days : days.slice(0, 4);

    return (
        <section className="min-w-0 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-[18px]">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold">{t.sevenDayForecast}</h3>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {expanded ? days.length : visibleDays.length} / {days.length}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="flex size-10 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white/10 transition hover:bg-white/20"
                >
                    {expanded ? (
                        <ChevronUp className="size-5" />
                    ) : (
                        <ChevronDown className="size-5" />
                    )}
                </button>
            </div>

            <div className="mt-4 space-y-2">
                <AnimatePresence initial={false}>
                    {visibleDays.map((day, index) => {
                        const min = Math.round(day.day.mintemp_c);
                        const max = Math.round(day.day.maxtemp_c);

                        const iconSrc = day.day.condition.icon.startsWith("//")
                            ? `https:${day.day.condition.icon}`
                            : day.day.condition.icon;

                        return (
                            <motion.div
                                key={day.date}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.22, delay: index * 0.03 }}
                                className="grid min-w-0 grid-cols-[minmax(0,1fr)_42px_72px] items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 transition hover:bg-white/10"
                            >
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold">
                                        {day.date}
                                    </p>

                                    <p className="truncate text-xs text-[var(--color-text-muted)]">
                                        {day.day.condition.text}
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
                                        <span className="flex items-center gap-1">
                                            <Droplets className="size-3.5 text-sky-300" />
                                            {day.day.daily_chance_of_rain}%
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <Wind className="size-3.5 text-cyan-300" />
                                            {Math.round(day.day.maxwind_kph)} km/h
                                        </span>
                                    </div>
                                </div>

                                <img
                                    src={iconSrc}
                                    alt={day.day.condition.text}
                                    className="size-10 object-contain"
                                />

                                <div className="text-right">
                                    <p className="text-base font-semibold">
                                        {max}°
                                    </p>
                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        {min}°
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {!expanded && days.length > 4 && (
                <div className="mt-4 flex justify-center gap-1.5">
                    {days.slice(0, 3).map((day, index) => (
                        <span
                            key={day.date}
                            className={[
                                "h-1.5 rounded-full transition-all",
                                index === 0
                                    ? "w-6 bg-sky-400"
                                    : "w-1.5 bg-[var(--color-text-muted)]/40",
                            ].join(" ")}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};