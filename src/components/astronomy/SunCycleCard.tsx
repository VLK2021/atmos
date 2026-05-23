"use client";

import { motion } from "framer-motion";
import { Sunrise, Sunset, SunMedium } from "lucide-react";

import en from "@/src/locales/en";
import type { Astro } from "@/src/types";

type Locale = typeof en;

type Props = {
    astro: Astro;
    t: Locale;
};

export const SunCycleCard = ({ astro, t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold">{t.sunCycle}</h2>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                        {t.sunrise}, {t.sunset}, {t.sunStatus}
                    </p>
                </div>

                <SunMedium className="size-5 text-amber-300" />
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="relative mx-auto h-[180px] w-full max-w-[520px] overflow-hidden">
                    <div className="absolute left-2 right-2 top-[94px] h-52 rounded-t-full border-t border-amber-400/70" />

                    <motion.div
                        animate={{ left: ["8%", "86%"], top: ["92px", "28px", "92px"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute size-6 rounded-full bg-amber-300 shadow-[0_0_28px_rgba(251,191,36,0.85)]"
                    />

                    <div className="absolute bottom-2 left-0 flex items-center gap-2 text-xs">
                        <Sunrise className="size-4 text-amber-300" />
                        <span>{astro.sunrise}</span>
                    </div>

                    <div className="absolute bottom-2 right-0 flex items-center gap-2 text-xs">
                        <Sunset className="size-4 text-orange-400" />
                        <span>{astro.sunset}</span>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 p-3">
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {t.isSunUp}
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                            {astro.is_sun_up ? "Yes" : "No"}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-3">
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {t.daylight}
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                            {astro.sunrise} — {astro.sunset}
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};