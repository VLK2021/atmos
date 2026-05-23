"use client";

import { motion } from "framer-motion";
import { Moon, MoonStar, Sparkles } from "lucide-react";

import en from "@/src/locales/en";
import type { Astro } from "@/src/types";

type Locale = typeof en;

type Props = {
    astro: Astro;
    t: Locale;
};

export const MoonDetailsCard = ({ astro, t }: Props) => {
    const illumination = Number(astro.moon_illumination) || 0;

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold">{t.moonDetails}</h2>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                        {t.moonPhase}, {t.moonIllumination}
                    </p>
                </div>

                <MoonStar className="size-5 text-violet-300" />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
                <div className="mx-auto flex flex-col items-center">
                    <div className="relative flex size-40 items-center justify-center rounded-full bg-white/5">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(#C4B5FD ${illumination}%, rgba(148,163,184,0.14) 0)`,
                            }}
                        />

                        <div className="relative flex size-32 items-center justify-center rounded-full bg-[var(--color-card-solid)]">
                            <Moon className="size-16 text-violet-300" />
                        </div>
                    </div>

                    <p className="mt-3 text-sm font-semibold">{astro.moon_phase}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                        {illumination}% {t.illumination}
                    </p>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-3">
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

                    <div className="rounded-2xl bg-white/5 p-3">
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {t.isMoonUp}
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold">
                            {astro.is_moon_up ? "Yes" : "No"}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-3">
                        <Sparkles className="size-4 text-violet-300" />
                        <p className="mt-2 text-sm font-semibold">
                            {illumination}%
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {t.moonIllumination}
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};