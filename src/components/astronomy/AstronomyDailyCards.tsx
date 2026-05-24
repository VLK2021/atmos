"use client";

import { motion } from "framer-motion";
import {
    Moon,
    Sparkles,
    Sunrise,
    Sunset,
    SunMedium,
} from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: ForecastDay[];
    t: Locale;
};

export const AstronomyDailyCards = ({ days, t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <h2 className="text-base font-semibold">{t.dailyAstronomy}</h2>

            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                {t.sunrise}, {t.sunset}, {t.moonPhase}
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {days.map((day, index) => {
                    const astro = day.astro;
                    const illumination = Number(astro.moon_illumination) || 0;

                    return (
                        <motion.article
                            key={day.date}
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.22,
                                delay: index * 0.025,
                            }}
                            whileHover={{
                                y: -5,
                                scale: 1.01,
                            }}
                            className="relative overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition dark:bg-white/5 dark:shadow-none"
                        >
                            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />

                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold">
                                        {day.date}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-[var(--color-text-muted)]">
                                        {astro.moon_phase}
                                    </p>
                                </div>

                                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-violet-400/12 dark:bg-violet-400/15">
                                    <Moon className="size-6 text-violet-400 dark:text-violet-300" />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-2.5 shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                                        <Sunrise className="size-3.5 text-amber-400" />
                                        {t.sunrise}
                                    </div>

                                    <p className="mt-1 truncate text-xs font-semibold">
                                        {astro.sunrise}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-2.5 shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                                        <Sunset className="size-3.5 text-orange-400" />
                                        {t.sunset}
                                    </div>

                                    <p className="mt-1 truncate text-xs font-semibold">
                                        {astro.sunset}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-2.5 shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                                        <Moon className="size-3.5 text-violet-400 dark:text-violet-300" />
                                        {t.moonrise}
                                    </div>

                                    <p className="mt-1 truncate text-xs font-semibold">
                                        {astro.moonrise}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-2.5 shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                                        <Moon className="size-3.5 text-violet-400 dark:text-violet-300" />
                                        {t.moonset}
                                    </div>

                                    <p className="mt-1 truncate text-xs font-semibold">
                                        {astro.moonset}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 shadow-sm dark:bg-white/5 dark:shadow-none">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="size-4 text-violet-400 dark:text-violet-300" />

                                        <p className="text-xs text-[var(--color-text-muted)]">
                                            {t.moonIllumination}
                                        </p>
                                    </div>

                                    <p className="text-xs font-semibold">
                                        {illumination}%
                                    </p>
                                </div>

                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-border)] dark:bg-white/10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${illumination}%` }}
                                        transition={{
                                            duration: 0.7,
                                            delay: index * 0.03,
                                        }}
                                        className="h-full rounded-full bg-violet-400"
                                    />
                                </div>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                                <div className="flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-2 text-[var(--color-text-muted)] shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <SunMedium className="size-3.5 text-amber-400" />
                                    {t.isSunUp}: {astro.is_sun_up ? "Yes" : "No"}
                                </div>

                                <div className="flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-2 text-[var(--color-text-muted)] shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <Moon className="size-3.5 text-violet-400 dark:text-violet-300" />
                                    {t.isMoonUp}: {astro.is_moon_up ? "Yes" : "No"}
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </motion.section>
    );
};