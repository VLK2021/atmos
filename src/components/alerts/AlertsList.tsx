"use client";

import { motion } from "framer-motion";
import {
    AlertTriangle,
    CalendarClock,
    CircleAlert,
    MapPinned,
    ShieldAlert,
} from "lucide-react";

import en from "@/src/locales/en";
import type { WeatherAlert } from "@/src/types";

type Locale = typeof en;

type Props = {
    alerts: WeatherAlert[];
    t: Locale;
};

export const AlertsList = ({ alerts, t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <h2 className="text-base font-semibold">{t.activeAlerts}</h2>

            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                {t.alertsPageSubtitle}
            </p>

            <div className="mt-4 grid gap-4">
                {alerts.map((alert, index) => (
                    <motion.article
                        key={`${alert.event}-${alert.effective}-${index}`}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25, delay: index * 0.04 }}
                        whileHover={{ y: -4, scale: 1.005 }}
                        className="relative overflow-hidden rounded-[26px] border border-red-400/20 bg-[var(--color-card)] p-4 shadow-[0_14px_40px_rgba(239,68,68,0.12)] dark:bg-red-500/5"
                    >
                        <motion.div
                            animate={{ x: ["-120%", "120%"] }}
                            transition={{
                                duration: 4.8,
                                repeat: Infinity,
                                ease: "linear",
                                delay: index * 0.3,
                            }}
                            className="absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-red-400/70 to-transparent"
                        />

                        <div className="relative z-10">
                            <div className="flex items-start gap-3">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/12">
                                    <AlertTriangle className="size-6 text-red-400" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-red-400">
                                        {alert.event || t.alertEvent}
                                    </p>

                                    <h3 className="mt-1 text-lg font-semibold">
                                        {alert.headline}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                                        {alert.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <CircleAlert className="size-4 text-red-400" />

                                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                        {t.alertSeverity}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        {alert.severity || "-"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <ShieldAlert className="size-4 text-amber-400" />

                                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                        {t.alertUrgency}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        {alert.urgency || "-"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <CalendarClock className="size-4 text-sky-400" />

                                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                        {t.alertEffective}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        {alert.effective || "-"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <CalendarClock className="size-4 text-violet-400" />

                                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                        {t.alertExpires}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        {alert.expires || "-"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid gap-3 xl:grid-cols-[0.8fr_1.2fr]">
                                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <div className="flex items-center gap-2">
                                        <MapPinned className="size-4 text-sky-400" />
                                        <p className="text-xs font-semibold">
                                            {t.alertAreas}
                                        </p>
                                    </div>

                                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                                        {alert.areas || "-"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 shadow-sm dark:bg-white/5 dark:shadow-none">
                                    <p className="text-xs font-semibold">
                                        {t.alertInstruction}
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                                        {alert.instruction || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
};