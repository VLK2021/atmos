"use client";

import { motion } from "framer-motion";
import { Activity, Factory, Wind } from "lucide-react";

import en from "@/src/locales/en";
import type { AirQuality } from "@/src/types";

type Locale = typeof en;

type Props = {
    airQuality?: AirQuality;
    t: Locale;
};

const getAqiLabel = (index: number) => {
    if (index <= 1) return "Good";
    if (index <= 2) return "Moderate";
    if (index <= 3) return "Unhealthy sensitive";
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-w-0 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-5"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-base font-semibold sm:text-lg">
                        {t.airQualityIndex}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        Pollution and particle concentration
                    </p>
                </div>

                <Wind className="size-5 text-sky-300" />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-[150px_minmax(0,1fr)] xl:grid-cols-1 2xl:grid-cols-[150px_minmax(0,1fr)]">
                <div className="flex flex-col items-center">
                    <div className="relative flex size-36 items-center justify-center rounded-full bg-white/5">
                        <motion.div
                            initial={{ rotate: -90 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(#22c55e ${percent}%, rgba(148,163,184,0.18) 0)`,
                            }}
                        />

                        <div className="relative flex size-28 flex-col items-center justify-center rounded-full bg-[var(--color-card-solid)]">
                            <p className="text-4xl font-semibold">{index || "-"}</p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                {t.aqiUs}
                            </p>
                        </div>
                    </div>

                    <p className="mt-3 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                        {getAqiLabel(index)}
                    </p>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                    {items.map(([label, value, unit], index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: index * 0.035 }}
                            className="rounded-2xl border border-white/5 bg-white/5 p-3"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    {label}
                                </p>
                                {index < 2 ? (
                                    <Activity className="size-3.5 text-sky-300" />
                                ) : (
                                    <Factory className="size-3.5 text-violet-300" />
                                )}
                            </div>

                            <p className="mt-2 truncate text-sm font-semibold">
                                {typeof value === "number" ? value.toFixed(1) : "-"}{" "}
                                <span className="text-xs text-[var(--color-text-muted)]">
                                    {unit}
                                </span>
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};