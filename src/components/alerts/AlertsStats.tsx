"use client";

import { motion } from "framer-motion";
import { Bell, CloudRain, Eye, ShieldCheck } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastResponse } from "@/src/types";

type Locale = typeof en;

type Props = {
    data: ForecastResponse;
    alertsCount: number;
    t: Locale;
};

export const AlertsStats = ({ data, alertsCount, t }: Props) => {
    const today = data.forecast.forecastday[0];

    const stats = [
        {
            label: t.activeAlerts,
            value: `${alertsCount}`,
            icon: Bell,
        },
        {
            label: t.rainChance,
            value: `${today.day.daily_chance_of_rain}%`,
            icon: CloudRain,
        },
        {
            label: t.visibility,
            value: `${data.current.vis_km} km`,
            icon: Eye,
        },
        {
            label: t.alertsSafety,
            value: alertsCount > 0 ? t.alertsPageTitle : t.noActiveAlerts,
            icon: ShieldCheck,
        },
    ];

    return (
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }, index) => (
                <motion.article
                    key={label}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28, delay: index * 0.045 }}
                    whileHover={{ y: -4, scale: 1.015 }}
                    className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[0_14px_40px_rgba(15,23,42,0.10)] backdrop-blur-[18px] transition dark:bg-white/5 dark:shadow-none"
                >
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                        className="absolute -right-8 -top-8 size-24 rounded-full border border-sky-300/15"
                    />

                    <div className="relative z-10">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-400/12">
                            <Icon className="size-5 text-sky-300" />
                        </div>

                        <p className="mt-4 text-2xl font-semibold">{value}</p>

                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                            {label}
                        </p>
                    </div>
                </motion.article>
            ))}
        </div>
    );
};