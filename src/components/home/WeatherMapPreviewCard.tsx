"use client";

import { motion } from "framer-motion";
import { Map, Radar } from "lucide-react";

import en from "@/src/locales/en";
import { HomeSectionHeader } from "@/src/components/home";

type Locale = typeof en;

type Props = {
    t: Locale;
};

export const WeatherMapPreviewCard = ({ t }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative min-h-[260px] overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <HomeSectionHeader
                title={t.weatherMap}
                subtitle={t.weatherMapPreview}
                href="/maps"
                t={t}
            />

            <div className="relative mt-3 h-[180px] overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.35),transparent_24%),radial-gradient(circle_at_70%_55%,rgba(34,197,94,0.28),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.25),transparent_22%),linear-gradient(135deg,rgba(15,23,42,0.75),rgba(30,41,59,0.5))]">
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:38px_38px]" />

                <motion.div
                    animate={{ x: ["-20%", "120%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/3 h-20 w-48 rounded-full bg-sky-400/25 blur-2xl"
                />

                <div className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sky-400/20 ring-1 ring-sky-300/30">
                    <Radar className="size-7 text-sky-200" />
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    <Map className="size-3.5" />
                    Lviv layer preview
                </div>
            </div>
        </motion.section>
    );
};