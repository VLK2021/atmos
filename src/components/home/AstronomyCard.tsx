"use client";

import { motion } from "framer-motion";
import { Moon, Sunrise, Sunset, SunMedium } from "lucide-react";

import en from "@/src/locales/en";
import type { Astro } from "@/src/types";

type Locale = typeof en;

type Props = {
    astro: Astro;
    t: Locale;
};

export const AstronomyCard = ({ astro, t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-w-0 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-5"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-base font-semibold sm:text-lg">
                        {t.sunAndMoon}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        Solar cycle and lunar phase
                    </p>
                </div>

                <SunMedium className="size-5 text-amber-300" />
            </div>

            <div className="mt-5 rounded-[28px] border border-[var(--color-border)] bg-white/5 p-4">
                <div className="relative mx-auto h-28 max-w-[360px] overflow-hidden">
                    <div className="absolute left-0 right-0 top-12 h-36 rounded-t-full border-t-2 border-amber-400/80" />

                    <motion.div
                        animate={{ x: ["0%", "380%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-2 top-[42px] size-5 rounded-full bg-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.8)]"
                    />

                    <div className="absolute left-0 top-16 flex items-center gap-2 text-xs">
                        <Sunrise className="size-4 text-amber-300" />
                        <span>{astro.sunrise}</span>
                    </div>

                    <div className="absolute right-0 top-16 flex items-center gap-2 text-xs">
                        <Sunset className="size-4 text-orange-400" />
                        <span>{astro.sunset}</span>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 p-3">
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {t.moonrise}
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold">
                            {astro.moonrise}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-3">
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {t.moonset}
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold">
                            {astro.moonset}
                        </p>
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-violet-400/15">
                        <Moon className="size-6 text-violet-300" />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                            {astro.moon_phase}
                        </p>
                        <p className="truncate text-xs text-[var(--color-text-muted)]">
                            {t.illumination} {astro.moon_illumination}%
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};