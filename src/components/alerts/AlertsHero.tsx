"use client";

import { motion } from "framer-motion";
import { AlertTriangle, BellRing, MapPinned, Radar } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastResponse } from "@/src/types";

type Locale = typeof en;

type Props = {
    data: ForecastResponse;
    alertsCount: number;
    t: Locale;
};

export const AlertsHero = ({ data, alertsCount, t }: Props) => {
    const hasAlerts = alertsCount > 0;

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
            className="relative overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-5 lg:p-6"
        >
            <motion.div
                animate={{
                    scale: hasAlerts ? [1, 1.15, 1] : [1, 1.05, 1],
                    opacity: hasAlerts ? [0.25, 0.6, 0.25] : [0.18, 0.32, 0.18],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className={[
                    "absolute -right-20 -top-20 size-80 rounded-full blur-3xl",
                    hasAlerts ? "bg-red-500/25" : "bg-sky-400/20",
                ].join(" ")}
            />

            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-24 left-1/3 size-80 rounded-full border border-sky-300/15"
            />

            <div className="relative z-10 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                        {t.alertsPageTitle}
                    </p>

                    <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                        {data.location.name}, {data.location.country}
                    </h1>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {t.alertsPageSubtitle}
                    </p>

                    <div className="mt-5 flex items-center gap-4">
                        <motion.div
                            animate={hasAlerts ? { rotate: [-4, 4, -4] } : { rotate: 0 }}
                            transition={{
                                duration: 0.55,
                                repeat: hasAlerts ? Infinity : 0,
                            }}
                            className={[
                                "flex size-16 shrink-0 items-center justify-center rounded-full ring-1",
                                hasAlerts
                                    ? "bg-red-500/15 ring-red-300/25"
                                    : "bg-emerald-500/15 ring-emerald-300/25",
                            ].join(" ")}
                        >
                            <AlertTriangle
                                className={[
                                    "size-8",
                                    hasAlerts ? "text-red-400" : "text-emerald-400",
                                ].join(" ")}
                            />
                        </motion.div>

                        <div className="min-w-0">
                            <p className="text-lg font-semibold">
                                {alertsCount} {t.activeAlerts}
                            </p>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {t.alertsChecked}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                        {
                            label: t.alertsOverview,
                            value: alertsCount > 0 ? t.activeAlerts : t.noActiveAlerts,
                            icon: BellRing,
                        },
                        {
                            label: t.mapCoordinates,
                            value: `${data.location.lat}, ${data.location.lon}`,
                            icon: MapPinned,
                        },
                        {
                            label: t.alertsSafety,
                            value: data.current.condition.text,
                            icon: Radar,
                        },
                    ].map(({ label, value, icon: Icon }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.04 }}
                            whileHover={{ y: -4, scale: 1.01 }}
                            className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl transition hover:bg-white/15"
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