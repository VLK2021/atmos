"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import en from "@/src/locales/en";
import type { WeatherAlert } from "@/src/types";
import { HomeSectionHeader } from "@/src/components/home";

type Locale = typeof en;

type Props = {
    alerts?: WeatherAlert[];
    t: Locale;
};

export const WeatherAlertsCard = ({ alerts = [], t }: Props) => {
    const firstAlert = alerts[0];

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <HomeSectionHeader
                title={t.weatherAlerts}
                subtitle={firstAlert ? firstAlert.event : t.noAlerts}
                href="/alerts"
                t={t}
            />

            <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15">
                    <AlertTriangle className="size-5 text-amber-300" />
                </div>

                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                        {firstAlert?.headline || t.noAlerts}
                    </p>

                    <p className="mt-1 line-clamp-2 text-xs text-[var(--color-text-muted)]">
                        {firstAlert?.desc || "Atmos is not detecting active severe weather warnings for this location."}
                    </p>
                </div>
            </div>
        </motion.section>
    );
};