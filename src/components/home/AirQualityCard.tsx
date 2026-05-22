"use client";

import { motion } from "framer-motion";
import { Activity, Factory, Wind } from "lucide-react";

import en from "@/src/locales/en";
import type { AirQuality } from "@/src/types";
import {HomeSectionHeader} from "@/src/components/home/HomeSectionHeader";

type Locale = typeof en;

type Props = {
    airQuality?: AirQuality;
    t: Locale;
};

const getAqiLabel = (index: number) => {
    if (index <= 1) return "Good";
    if (index <= 2) return "Moderate";
    if (index <= 3) return "Sensitive";
    if (index <= 4) return "Unhealthy";
    if (index <= 5) return "Very unhealthy";
    return "Hazardous";
};

export const AirQualityCard = ({ airQuality, t }: Props) => {
    const index = airQuality?.["us-epa-index"] ?? 0;
    const percent = Math.min(index * 16.6, 100);

    const items = [
        [t.pm25, airQuality?.pm2_5, "μg/m³"],
        [t.pm10, airQuality?.pm10, "μg/m³"],
        [t.ozone, airQuality?.o3, "μg/m³"],
        [t.nitrogenDioxide, airQuality?.no2, "μg/m³"],
        [t.sulfurDioxide, airQuality?.so2, "μg/m³"],
        [t.carbonMonoxide, airQuality?.co, "μg/m³"],
    ] as const;

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <HomeSectionHeader
                title={t.airQualityIndex}
                subtitle="Particle concentration"
                href="/air-quality"
                t={t}
            />

            <div className="mt-4 grid items-center gap-4 sm:grid-cols-[120px_minmax(0,1fr)] xl:grid-cols-1 2xl:grid-cols-[120px_minmax(0,1fr)]">
                <div className="mx-auto flex flex-col items-center">
                    <div className="relative flex size-28 items-center justify-center rounded-full bg-white/5 sm:size-30">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(#22c55e ${percent}%, rgba(148,163,184,0.18) 0)`,
                            }}
                        />

                        <div className="relative flex size-20 flex-col items-center justify-center rounded-full bg-[var(--color-card-solid)] sm:size-22">
                            <p className="text-3xl font-semibold">{index || "-"}</p>
                            <p className="text-[10px] text-[var(--color-text-muted)]">
                                {t.aqiUs}
                            </p>
                        </div>
                    </div>

                    <p className="mt-2 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                        {getAqiLabel(index)}
                    </p>
                </div>

                <div className="grid min-w-0 grid-cols-2 gap-2">
                    {items.map(([label, value, unit], idx) => (
                        <div
                            key={label}
                            className="min-w-0 rounded-xl border border-white/5 bg-white/5 p-2.5"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <p className="truncate text-[11px] text-[var(--color-text-muted)]">
                                    {label}
                                </p>

                                {idx < 2 ? (
                                    <Activity className="size-3 text-sky-300" />
                                ) : (
                                    <Factory className="size-3 text-violet-300" />
                                )}
                            </div>

                            <p className="mt-1 truncate text-xs font-semibold">
                                {typeof value === "number" ? value.toFixed(1) : "-"}{" "}
                                <span className="text-[10px] text-[var(--color-text-muted)]">
                                    {unit}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};