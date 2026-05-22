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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex h-full min-h-[360px] min-w-0 flex-col overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-base font-semibold">{t.sunAndMoon}</h3>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                        Solar arc and lunar data
                    </p>
                </div>

                <SunMedium className="size-4 text-amber-300" />
            </div>

            <div className="mt-4 flex flex-1 flex-col rounded-2xl border border-[var(--color-border)] bg-white/5 p-3">
                <div className="relative mx-auto h-[100px] w-full max-w-[320px] overflow-hidden">
                    <div className="absolute left-2 right-2 top-[50px] h-28 rounded-t-full border-t border-amber-400/80" />

                    <motion.div
                        animate={{ left: ["8%", "84%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[41px] size-4 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.8)]"
                    />

                    <div className="absolute bottom-0 left-0 flex items-center gap-1.5 text-[11px]">
                        <Sunrise className="size-3.5 text-amber-300" />
                        <span>{astro.sunrise}</span>
                    </div>

                    <div className="absolute bottom-0 right-0 flex items-center gap-1.5 text-[11px]">
                        <Sunset className="size-3.5 text-orange-400" />
                        <span>{astro.sunset}</span>
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-white/5 p-2.5">
                        <p className="text-[11px] text-[var(--color-text-muted)]">
                            {t.moonrise}
                        </p>
                        <p className="mt-1 truncate text-xs font-semibold">
                            {astro.moonrise}
                        </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-2.5">
                        <p className="text-[11px] text-[var(--color-text-muted)]">
                            {t.moonset}
                        </p>
                        <p className="mt-1 truncate text-xs font-semibold">
                            {astro.moonset}
                        </p>
                    </div>
                </div>

                <div className="mt-auto flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-400/15">
                        <Moon className="size-5 text-violet-300" />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-xs font-semibold">
                            {astro.moon_phase}
                        </p>
                        <p className="truncate text-[11px] text-[var(--color-text-muted)]">
                            {t.illumination} {astro.moon_illumination}%
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};