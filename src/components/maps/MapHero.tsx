"use client";

import { motion } from "framer-motion";
import { Compass, Layers, MapPinned, Navigation } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastResponse } from "@/src/types";

type Locale = typeof en;

type Props = {
    data: ForecastResponse;
    t: Locale;
};

export const MapHero = ({ data, t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-5 lg:p-6"
        >
            <div className="absolute -right-24 -top-24 size-80 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="absolute -bottom-28 left-1/4 size-96 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative z-10 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                        {t.mapsPageTitle}
                    </p>

                    <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                        {data.location.name}, {data.location.country}
                    </h1>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {t.mapsPageSubtitle}
                    </p>

                    <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                        <MapPinned className="size-5 text-sky-300" />

                        <div>
                            <p className="text-sm font-semibold">
                                {t.mapCoordinates}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                {data.location.lat}, {data.location.lon}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                        {
                            label: t.precipitationLayer,
                            value: "WeatherAPI",
                            icon: Layers,
                        },
                        {
                            label: t.temperatureLayer,
                            value: "Tiles",
                            icon: Compass,
                        },
                        {
                            label: t.mapZoomHint,
                            value: "Interactive",
                            icon: Navigation,
                        },
                    ].map(({ label, value, icon: Icon }, index) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.035 }}
                            className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl"
                        >
                            <Icon className="size-4 text-sky-300" />
                            <p className="mt-3 truncate text-sm font-semibold">
                                {value}
                            </p>
                            <p className="mt-0.5 line-clamp-2 text-[11px] text-[var(--color-text-muted)]">
                                {label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};