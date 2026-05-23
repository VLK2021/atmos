"use client";

import { motion } from "framer-motion";
import { Activity, Factory, ShieldCheck, Wind } from "lucide-react";

import en from "@/src/locales/en";
import type { AirQuality } from "@/src/types";

type Locale = typeof en;

type Props = {
    airQuality: AirQuality;
    t: Locale;
};

export const AirQualityDetailsGrid = ({ airQuality, t }: Props) => {
    const items = [
        {
            label: t.pm25,
            value: airQuality.pm2_5,
            unit: "μg/m³",
            icon: Activity,
            description: "Fine particles",
        },
        {
            label: t.pm10,
            value: airQuality.pm10,
            unit: "μg/m³",
            icon: Activity,
            description: "Coarse particles",
        },
        {
            label: t.ozone,
            value: airQuality.o3,
            unit: "μg/m³",
            icon: Wind,
            description: "Ground-level ozone",
        },
        {
            label: t.nitrogenDioxide,
            value: airQuality.no2,
            unit: "μg/m³",
            icon: Factory,
            description: "Traffic pollution",
        },
        {
            label: t.sulfurDioxide,
            value: airQuality.so2,
            unit: "μg/m³",
            icon: Factory,
            description: "Industrial emissions",
        },
        {
            label: t.carbonMonoxide,
            value: airQuality.co,
            unit: "μg/m³",
            icon: ShieldCheck,
            description: "Combustion gas",
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <h2 className="text-base font-semibold">{t.airQualityDetails}</h2>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                {t.pollutants}
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {items.map(({ label, value, unit, icon: Icon, description }, index) => (
                    <motion.article
                        key={label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: index * 0.035 }}
                        className="rounded-[22px] border border-white/5 bg-white/5 p-3 transition hover:-translate-y-0.5 hover:bg-white/10"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                    {label}
                                </p>

                                <p className="mt-1 truncate text-xs text-[var(--color-text-muted)]">
                                    {description}
                                </p>
                            </div>

                            <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-sky-400/10">
                                <Icon className="size-4 text-sky-300" />
                            </div>
                        </div>

                        <p className="mt-4 text-2xl font-semibold">
                            {value.toFixed(1)}
                        </p>

                        <p className="text-xs text-[var(--color-text-muted)]">
                            {unit}
                        </p>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
};