"use client";

import { motion } from "framer-motion";
import { Moon, Sparkles, Sunrise, Sunset, SunMedium } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastResponse } from "@/src/types";

type Locale = typeof en;

type Props = {
    data: ForecastResponse;
    t: Locale;
};

export const AstronomyHero = ({ data, t }: Props) => {
    const astro = data.forecast.forecastday[0].astro;

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-5 lg:p-6"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.18),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(139,92,246,0.22),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.14),transparent_30%)]" />

            <motion.div
                animate={{ opacity: [0.35, 0.8, 0.35], scale: [1, 1.08, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-10 top-8 size-24 rounded-full bg-violet-300/20 blur-2xl"
            />

            <div className="relative z-10 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                        {t.astronomyPageTitle}
                    </p>

                    <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                        {data.location.name}, {data.location.country}
                    </h1>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {t.astronomyPageSubtitle}
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                        <div className="flex size-16 items-center justify-center rounded-full bg-amber-400/15">
                            <SunMedium className="size-8 text-amber-300" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-lg font-semibold">{t.sunCycle}</p>
                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {astro.sunrise} — {astro.sunset}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                        { label: t.sunrise, value: astro.sunrise, icon: Sunrise },
                        { label: t.sunset, value: astro.sunset, icon: Sunset },
                        { label: t.moonPhase, value: astro.moon_phase, icon: Moon },
                        {
                            label: t.moonIllumination,
                            value: `${astro.moon_illumination}%`,
                            icon: Sparkles,
                        },
                    ].map(({ label, value, icon: Icon }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.24, delay: index * 0.035 }}
                            className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl"
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