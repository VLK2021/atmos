"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Radar, ShieldCheck } from "lucide-react";

import en from "@/src/locales/en";

type Locale = typeof en;

type Props = {
    t: Locale;
};

export const AlertsEmptyState = ({ t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative min-h-[420px] overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/20"
            />

            <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl"
            />

            <div className="relative z-10 flex min-h-[360px] flex-col items-center justify-center text-center">
                <div className="relative">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-14px] rounded-full border border-dashed border-emerald-400/40"
                    />

                    <div className="flex size-24 items-center justify-center rounded-full bg-emerald-500/12 ring-1 ring-emerald-400/25">
                        <CheckCircle2 className="size-12 text-emerald-400" />
                    </div>
                </div>

                <h2 className="mt-8 text-2xl font-bold">
                    {t.noActiveAlerts}
                </h2>

                <p className="mt-3 max-w-[560px] text-sm leading-6 text-[var(--color-text-muted)]">
                    {t.noActiveAlertsDescription}
                </p>

                <div className="mt-6 grid w-full max-w-[680px] gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-left shadow-sm dark:bg-white/5 dark:shadow-none">
                        <Radar className="size-5 text-sky-400" />

                        <p className="mt-3 text-sm font-semibold">
                            {t.alertsChecked}
                        </p>

                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                            WeatherAPI alerts feed
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-left shadow-sm dark:bg-white/5 dark:shadow-none">
                        <ShieldCheck className="size-5 text-emerald-400" />

                        <p className="mt-3 text-sm font-semibold">
                            {t.alertsSafety}
                        </p>

                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                            {t.noActiveAlerts}
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};