"use client";

import { motion } from "framer-motion";
import { Archive, CalendarClock, CloudRain, History, MapPinned } from "lucide-react";

import en from "@/src/locales/en";
import type { WeatherHistoryResponse } from "@/src/types";

type Locale = typeof en;

type Props = {
    data: WeatherHistoryResponse;
    t: Locale;
};

export const HistoryHero = ({ data, t }: Props) => {
    const days = data.forecast.forecastday;

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
            className="relative overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-5 lg:p-6"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 -top-20 size-72 rounded-full border border-sky-300/20"
            />

            <motion.div
                animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-24 left-1/4 size-96 rounded-full bg-violet-500/15 blur-3xl"
            />

            <div className="relative z-10 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                        {t.historyPageTitle}
                    </p>

                    <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                        {data.location.name}, {data.location.country}
                    </h1>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {t.historyPageSubtitle}
                    </p>

                    <div className="mt-5 flex items-center gap-4">
                        <div className="flex size-16 items-center justify-center rounded-full bg-sky-400/15 ring-1 ring-sky-300/20">
                            <History className="size-8 text-sky-300" />
                        </div>

                        <div>
                            <p className="text-lg font-semibold">
                                {days.length} {t.historicalDays}
                            </p>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {days[0]?.date} — {days[days.length - 1]?.date}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                        {
                            label: t.historySummary,
                            value: t.historyPageTitle,
                            icon: Archive,
                        },
                        {
                            label: t.mapCoordinates,
                            value: `${data.location.lat}, ${data.location.lon}`,
                            icon: MapPinned,
                        },
                        {
                            label: t.historicalDays,
                            value: `${days.length}`,
                            icon: CalendarClock,
                        },
                        {
                            label: t.totalPrecipitation,
                            value: `${days.reduce((acc, d) => acc + d.day.totalprecip_mm, 0).toFixed(1)} mm`,
                            icon: CloudRain,
                        },
                    ].map(({ label, value, icon: Icon }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.035 }}
                            className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/15"
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