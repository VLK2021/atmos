"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import en from "@/src/locales/en";
import { HomeSectionHeader } from "@/src/components/home";

type Locale = typeof en;

type Props = {
    t: Locale;
    lat: number;
    lon: number;
    city: string;
};

const WeatherMiniMap = dynamic(
    () => import("@/src/components/maps").then((mod) => mod.WeatherMiniMap),
    {
        ssr: false,
    },
);

export const WeatherMapPreviewCard = ({ t, lat, lon, city }: Props) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative min-h-[300px] overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <HomeSectionHeader
                title={t.weatherMap}
                subtitle={t.weatherMapPreview}
                href="/maps"
                t={t}
            />

            <div className="mt-3 h-[220px] overflow-hidden rounded-3xl border border-white/10">
                <WeatherMiniMap lat={lat} lon={lon} city={city} />
            </div>
        </motion.section>
    );
};