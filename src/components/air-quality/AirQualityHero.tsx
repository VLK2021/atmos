"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Wind } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastResponse } from "@/src/types";

type Locale = typeof en;

type Props = {
    data: ForecastResponse;
    t: Locale;
};

const getAqiLabel = (index: number, t: Locale) => {
    if (index <= 1) return t.good;
    if (index <= 2) return t.moderate;
    if (index <= 3) return t.unhealthySensitive;
    if (index <= 4) return t.unhealthy;
    if (index <= 5) return t.veryUnhealthy;
    return t.hazardous;
};

export const AirQualityHero = ({ data, t }: Props) => {
    const air = data.current.air_quality;
    const epa = air?.["us-epa-index"] ?? 0;
    const defra = air?.["gb-defra-index"] ?? 0;
    const percent = Math.min(epa * 16.6, 100);

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
            className="relative overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-5 lg:p-6"
        >
            <motion.div
                animate={{ x: [0, 22, 0], y: [0, -12, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-24 -top-24 size-80 rounded-full bg-emerald-400/16 blur-3xl"
            />

            <motion.div
                animate={{ x: [0, -18, 0], y: [0, 14, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-28 left-1/4 size-96 rounded-full bg-sky-500/14 blur-3xl"
            />

            <div className="relative z-10 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                        {t.airQualityPageTitle}
                    </p>

                    <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                        {data.location.name}, {data.location.country}
                    </h1>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {t.airQualityPageSubtitle}
                    </p>

                    <div className="mt-6 flex items-center gap-5">
                        <div className="relative flex size-32 items-center justify-center rounded-full bg-white/5">
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: `conic-gradient(#22c55e ${percent}%, rgba(148,163,184,0.16) 0)`,
                                }}
                            />

                            <div className="relative flex size-24 flex-col items-center justify-center rounded-full bg-[var(--color-card-solid)]">
                                <p className="text-4xl font-semibold">{epa || "-"}</p>
                                <p className="text-[10px] text-[var(--color-text-muted)]">
                                    {t.epaIndex}
                                </p>
                            </div>
                        </div>

                        <div className="min-w-0">
                            <p className="text-lg font-semibold">
                                {getAqiLabel(epa, t)}
                            </p>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {t.defraIndex}: {defra || "-"}
                            </p>

                            <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                                {t.lastUpdated}: {data.current.last_updated}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                        { label: t.pm25, value: air?.pm2_5, icon: Activity },
                        { label: t.pm10, value: air?.pm10, icon: Activity },
                        { label: t.ozone, value: air?.o3, icon: Wind },
                        { label: t.nitrogenDioxide, value: air?.no2, icon: Wind },
                        { label: t.sulfurDioxide, value: air?.so2, icon: ShieldCheck },
                        { label: t.carbonMonoxide, value: air?.co, icon: ShieldCheck },
                    ].map(({ label, value, icon: Icon }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.035 }}
                            className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl transition hover:bg-white/15"
                        >
                            <Icon className="size-4 text-sky-300" />

                            <p className="mt-3 truncate text-sm font-semibold">
                                {typeof value === "number" ? value.toFixed(1) : "-"}
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